import React from "react";
import {apiContexts} from "../../api/ContextApi";
import {BaseItemUpdationPage} from "../../Base/BaseItemUpdationPage";
import {makeLocationEditableTemplate} from "./makeLocationEditableTemplate";
import {LocationsEditZipCodes} from "./LocationsEditZipCodes";
import {If} from "../../Base/If";
import {CancelIcon, Spinner} from "../../icons";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {DeleteManagerDialog} from "../Managers/DeleteManagerDialog";
import {RoutingConstants} from "../../constants/RoutingConstants";


export const LocationsEditProps = ({location_id, history}) => {
    const title = 'Location';
    const {
        locations_GetById,
        locations_UpdateById,
        locations_DeleteForewerById,
    } = React.useContext(apiContexts.locations);
    const {
        locationsZipcode_GetByLocationId,
        locationsZipcode_InsertByData,
        locationsZipcode_DeleteById
    } = React.useContext(apiContexts.locationsZipcode);

    const {
        users_deactivateInZipCodes,
    } = React.useContext(apiContexts.users);


    React.useEffect(() => {
        locationsZipcode_GetByLocationId.request(location_id);
        locations_GetById.request(location_id);
    }, [location_id]);

    const zipCode_items = locationsZipcode_GetByLocationId.state || [];
    const zipCodes = zipCode_items.map(item => item.zipcode);

    const pending = !!locationsZipcode_GetByLocationId.pending
        || !!locations_GetById.pending
        || !!locationsZipcode_InsertByData.pending
        || !!locationsZipcode_DeleteById.pending
        || !!users_deactivateInZipCodes.pending
        || !!locations_UpdateById.pending
        || !!locations_DeleteForewerById.pending
    ;

    const zipCode_insertByZipCode = (zipcode) => locationsZipcode_InsertByData.request({location_id, zipcode})
        .then(r => {
            locationsZipcode_GetByLocationId.request(location_id);
        });

    const zipCode_deleteById = (id) => locationsZipcode_DeleteById.request(id)
        .then(r => {
            const item = zipCode_items.find(item => +item.id === +id);
            if (r && item && item.zipcode) {
                users_deactivateInZipCodes
                    .request([item.zipcode])
            }
            locationsZipcode_GetByLocationId.request(location_id);
        });

    const [deleteId, setDeleteId] = React.useState(false);
    const location_handleOpenDeleteConfirmation = () => {
        setDeleteId(location_id);
    };
    const location_handleSubmitDelete = () => {
        if (zipCodes.length) {
            users_deactivateInZipCodes
                .request(zipCodes)
        }
        return locations_DeleteForewerById
            .request(location_id)
            .then(r => setDeleteId(null) || r)
            .then(r => r ? history.push(`/${RoutingConstants.locations}`) : null)
        ;

    };
    const location_handleCancelDelete = () => {
        setDeleteId(null);
    };

    const location_handleSave = data => {
        if (data.deleted_at !== undefined && zipCodes.length) {
            if (data.deleted_at) {
                users_deactivateInZipCodes
                    .request(zipCodes)
            }
        }

        locations_UpdateById
            .request(location_id, data)
            .then(r => r ? locations_GetById.setState(r) : null)
    };

    return <React.Fragment>
        <DeleteManagerDialog
            title={'Confirm permanently delete'}
            fullWidth
            maxWidth={'sm'}
            onSubmit={location_handleSubmitDelete}
            operationDescription={`Delete location ${locations_GetById.state ? locations_GetById.state.name : 'Error'} FOREVER`}
            confirmationWord={'DELETE'}
            deleteId={deleteId}
            onCancel={location_handleCancelDelete}
        />
        <BaseItemUpdationPage
            onDelete={location_handleOpenDeleteConfirmation}
            disabled={!!pending}
            data={locations_GetById.state}
            editableTemplate={makeLocationEditableTemplate()}
            renderTitle={() => title}
            onSave={location_handleSave}
        />
        <LocationsEditZipCodes
            disabled={!!pending}
            location_id={location_id}
            items={zipCode_items}
            deleteById={zipCode_deleteById}
            insertByZipCode={zipCode_insertByZipCode}
        />
        <UserActivationBar
            onClose={()=>users_deactivateInZipCodes.setState(null)}
            data={users_deactivateInZipCodes.state}
            pending={users_deactivateInZipCodes.pending}
        />

    </React.Fragment>
};


const UserActivationBar = ({onClose, data, pending}) => {
    const errors = data && data.errors ? data.errors : [];
    const updated_count = data && data.updated_count ? data.updated_count : 0;
    const mail_user_emails = data && data.mail_user_emails ? data.mail_user_emails : [];

    return <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        open={!!data || !!pending}
        autoHideDuration={60000}
        onClose={onClose}
        ContentProps={{
            'aria-describedby': 'message-id',
        }}
        message={
            <If value={pending}>
                <span id="message-id">Updating users... <Spinner/></span>
                <React.Fragment>
                    <p>Users updated: {updated_count}</p>
                    <If value={errors.length}>
                        <React.Fragment>
                            <p>Errors:</p>
                            <ul style={{maxHeight: 200, overflow: 'auto'}}>
                                {errors.map((v, key) =>
                                    <li key={key}>{v}</li>
                                )}
                            </ul>
                        </React.Fragment>
                    </If>
                    <If value={mail_user_emails.length}>
                        <React.Fragment>
                            <p>Emails:</p>

                            <ul style={{maxHeight: 600, overflow: 'auto'}}>
                                {mail_user_emails.map((v, key) =>
                                    <li key={key}>{v}</li>
                                )}
                            </ul>
                        </React.Fragment>
                    </If>

                </React.Fragment>
            </If>
        }
        action={[

            <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={onClose}
            >
                <CancelIcon/>
            </IconButton>,
        ]}
    />
};
