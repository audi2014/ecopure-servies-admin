import React from "react";
import {apiContexts} from "../../api/ContextApi";
import MaterialTable from "material-table";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {VisibleColumnsDialog} from "./VisibleColumnsDialog";
import Cookies from "js-cookie";
import {COOKIE_KEY_USER_COLUMNS} from "../../constants/Enum";
import {DialogLoading} from "./DialogLoading";
import {FIELDS_DB_USER} from "../BaseManageUsers/constants";
import {initialVisibleFields, TABLE_COLUMNS_USER, USER_FIELD_TITLE} from "./tools";
import {ActionsMenu} from "./ActionsMenu";

export const ManageUsersPage = ({history}) => {
    const [selectedUserIds, setSelectedUserIds] = React.useState([]);
    const [dialogColumnsOpen, setDialogColumnsOpen] = React.useState(false);
    const [visibleColumnFields, setVisibleColumnFields] = React.useState(initialVisibleFields);

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
    const {users_GetPage, users_SendSetUpPasswordById} = React.useContext(apiContexts.users);
    const request = (query) => {
        return users_GetPage.request({
            filters: (query.filters || []).reduce(function (prev, {column, value}) {
                prev[column.field] = value;
                return prev;
            }, {}),
            orderBy: (query.orderBy && query.orderBy.field) || '',
            orderDirection: query.orderDirection || 'asc',
            search: query.search || '',
            offset: (query.page) * query.pageSize,
            count: query.pageSize,
        }).then(result => {
            if (!result) {
                return {
                    data: [],
                    page: 0,
                    totalCount: 0,
                };
            }
            return {
                data: result.items,
                page: Math.ceil((result.offset) / query.pageSize),
                totalCount: result.total,
            }
        })
    };

    return <React.Fragment>
        <DialogLoading open={!!users_SendSetUpPasswordById.pending} title={'Sending email...'}/>
        <VisibleColumnsDialog
            item_title={USER_FIELD_TITLE}
            open={dialogColumnsOpen}
            onClose={handleClose}
            value={visibleColumnFields}
            setValue={handleColumnsChange}
            items={FIELDS_DB_USER}
        />
        <MaterialTable

            options={{
                selection: true,
                filtering: true,
                pageSize: 20,
                exportAllData: true,
                exportButton: true,
                pageSizeOptions: [20, 30, 50]
            }}
            actions={[
                {
                    icon: 'add',
                    tooltip: 'Add User',
                    isFreeAction: true,
                    onClick: onAddClick
                },
                {
                    icon: 'view_column',
                    tooltip: 'Columns',
                    isFreeAction: true,
                    onClick: handleOpen
                },


            ]}
            title="Manage Users"
            columns={columns}
            data={query =>
                request(query)
            }

            onSelectionChange={(rows) => setSelectedUserIds(rows.map(r => r.id))}
        />
    </React.Fragment>

};
