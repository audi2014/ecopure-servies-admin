import React from "react";
import {apiContexts} from "../../api/ContextApi";
import {EditIcon, PreviewIcon, Spinner} from "../../icons";
import Grid from "@material-ui/core/Grid/Grid";
import Typography from "@material-ui/core/Typography/Typography";
import {If} from "../../Base/If";
import {ModalCard} from "../BaseManageUsers/Card";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {UserView} from "../BaseManageUsers/UserView";
import {useBuildings_GetByAccess, useLocations_GetByAccess, useZipCodes_GetByAccess} from "../tools_effect";
import {EditUserFrorm} from "./EditUserFrorm";


export const ManageUsersEditUserPage = ({match}) => {
    const user_id = +match.params.user_id;
    const [readOnly, setReadOnly] = React.useState(true);
    const {
        users_GetFirstById,
        users_RequireTokenById,
        users_cardGetById,
        users_addBillingInfo,
        users_editByIdAndData,
    } = React.useContext(apiContexts.users);
    const [zip_state, zip_request, zip_pending] = useZipCodes_GetByAccess();
    const [buildings_state, buildings_request, buildings_pending] = useBuildings_GetByAccess();
    const [locations_state, locations_request, locations_pending] = useLocations_GetByAccess();

    const user_loading = !!buildings_pending
        || !!locations_pending
        || !!zip_pending
        || !!users_addBillingInfo.pending
        || !!users_GetFirstById.pending
        || !!users_RequireTokenById.pending
    ;
    const user = users_GetFirstById.state;
    const card = users_cardGetById.state;

    React.useEffect(() => {
        zip_request();
        buildings_request();
        locations_request();
    }, []);

    React.useEffect(() => {
        users_GetFirstById.request(user_id);
        users_cardGetById.request(user_id);
    }, [user_id]);

    React.useEffect(() => {
        if (user && !user.token) {
            users_RequireTokenById.request(user.id).then(token => {
                users_GetFirstById.setState({...user, token});
            })
        }
    }, [user && user.token]);

    const handleToggleReadOnly = () => {
        setReadOnly(!readOnly);
    };

    const handleUpdateUser = (data) => {
        users_editByIdAndData.request(user_id, data)
            .then(() => users_GetFirstById.request(user_id))
    };

    const handleUpdateCard = data => {
        return users_addBillingInfo.request({
            ...data,
            email: user.email,
        }).then(() => {
            return users_cardGetById.request(user_id);
        })
    };


    if (users_GetFirstById.pending) return <Spinner/>;
    else if (!user) return null;
    else if (!user.token) return (
        <Typography style={{margin: 20}} variant="h6">
            Updating User Token...<Spinner/>
        </Typography>
    );
    else return <Grid container justify="center" spacing={8}>
            <Grid item xs={12} md={8} lg={8}>
                <Typography style={{margin: 20}} variant="h6">
                    <If value={readOnly}>
                        <span>User Info</span>
                        <span>Edit User</span>
                    </If>
                    <IconButton onClick={handleToggleReadOnly}>
                        <If value={readOnly}>
                            <EditIcon/>
                            <PreviewIcon/>
                        </If>
                    </IconButton>
                    <If value={card && !users_cardGetById.pending}>
                        <ModalCard
                            {...card}
                            onSubmit={handleUpdateCard}
                            pending={!!users_addBillingInfo.pending}/>
                        <Spinner/>
                    </If>
                </Typography>
                <If value={readOnly}>
                    <UserView {...user}/>
                    <If value={user_loading}>
                        <Spinner/>
                        <EditUserFrorm
                            pending={!!users_editByIdAndData.pending}
                            onSubmit={handleUpdateUser}
                            user={user}
                            zipcodes={zip_state || []}
                            buildings={buildings_state || []}
                            locations={locations_state || []}
                            key={user.id}
                        />
                    </If>
                </If>
            </Grid>
        </Grid>
};

