import React from "react";
import {apiContexts} from "../../api/ContextApi";
import MaterialTable from "material-table";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {VisibleColumnsDialog} from "./VisibleColumnsDialog";
import Cookies from "js-cookie";
import {COOKIE_KEY_USER_COLUMNS} from "../../constants/Enum";
import {DialogLoading} from "./DialogLoading";
import {FIELDS_DB_USER} from "../BaseManageUsers/constants";
import {initialVisibleFields, makeTableActions, makeTableRequest, TABLE_COLUMNS_USER, USER_FIELD_TITLE} from "./tools";
import {ActionsMenu} from "./ActionsMenu";
import {useAuthEffect} from "../../Auth/AuthController";
import {DeleteManagerDialog} from "../Managers/DeleteManagerDialog";
import Typography from "@material-ui/core/Typography/Typography";

export const ManageUsersPage = ({history}) => {
    const auth = useAuthEffect();
    const [deleteRows, setDeleteRows] = React.useState([]);
    const {users_GetPage, users_SendSetUpPasswordById, users_deleteBulk} = React.useContext(apiContexts.users);
    const [dialogColumnsOpen, setDialogColumnsOpen] = React.useState(false);
    const [visibleColumnFields, setVisibleColumnFields] = React.useState(initialVisibleFields);
    const tableRef = React.useRef(null);


    const handleDeleteClick = (e, rowOrRows) => {
        if (Array.isArray(rowOrRows)) {
            setDeleteRows(rowOrRows);
        } else if (rowOrRows && typeof rowOrRows === 'object' && rowOrRows.id) {
            setDeleteRows([rowOrRows]);
        }
    };
    const handleSubmitDelete = (rows) => {
        return users_deleteBulk.request(rows.map(r => r.id))
            .then(() => setDeleteRows([]))
            .then(() => tableRef.current.onQueryChange());
    };
    const handleCancelDelete = () => {
        setDeleteRows([]);
    };


    const handleEditClick = id => {
        history.push(`/${RoutingConstants.manageUsers}/${id}/edit`);
    };
    const handleBookClick = id => {
        history.push(`/${RoutingConstants.manageUsers}/${id}/book`)
    };
    const handleSendPassword = id => {
        if (id && !users_SendSetUpPasswordById.pending) {
            users_SendSetUpPasswordById.request(id)
        }
    };

    function handleColumnsChange(v) {
        Cookies.set(COOKIE_KEY_USER_COLUMNS, v);
        setVisibleColumnFields(v);
    }

    function handleClose() {
        setDialogColumnsOpen(false);
    }

    function handleOpen() {
        setDialogColumnsOpen(true);
    }


    const columns = [
        {
            title: 'Actions',
            render: (rowData) => {
                return <ActionsMenu
                    id={rowData.id}
                    onBook={handleBookClick}
                    onEdit={handleEditClick}
                    onSendPassword={handleSendPassword}
                />
            }
        },
        ...TABLE_COLUMNS_USER
            .filter(v => visibleColumnFields.includes(v.field))
    ];

    const onAddClick = () => history.push(`/${RoutingConstants.manageUsers}/add`);
    const request = makeTableRequest(users_GetPage.request);

    const actions = makeTableActions({onAddClick,handleDeleteClick, handleOpen ,auth})

    const options = {
        debounceInterval:250,
        selection: true,
        filtering: true,
        pageSize: 20,
        exportAllData: true,
        exportButton: true,
        pageSizeOptions: [20, 30, 50]
    };

    return <React.Fragment>
        <DialogLoading open={!!users_SendSetUpPasswordById.pending} title={'Sending email...'}/>
        <DeleteManagerDialog
            onSubmit={handleSubmitDelete}
            operationDescription={`Delete users:\n ${deleteRows.map(user => `${user.email}`).join('\n')} ?`}
            confirmationWord={'DELETE'}
            deleteId={deleteRows.length ? deleteRows : null}
            onCancel={handleCancelDelete}
        />
        <VisibleColumnsDialog
            item_title={USER_FIELD_TITLE}
            open={dialogColumnsOpen}
            onClose={handleClose}
            value={visibleColumnFields}
            setValue={handleColumnsChange}
            items={FIELDS_DB_USER}
        />
        <MaterialTable
            tableRef={tableRef}
            options={options}
            actions={actions}
            title="Manage Users"
            columns={columns}
            data={query => request(query)}
        />
    </React.Fragment>

};
