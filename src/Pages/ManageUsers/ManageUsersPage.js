import React from "react";
import {apiContexts} from "../../api/ContextApi";
import MaterialTable from "material-table";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {VisibleColumnsDialog} from "./VisibleColumnsDialog";
import {USERS_FIELDS, TABLE_COLUMNS_USER} from "./columns";
import Cookies from "js-cookie";
import {COOKIE_KEY_USER_COLUMNS} from "../../constants/Enum";
import {DialogLoading} from "./DialogLoading";

export const initialVisibleFields = Cookies.getJSON(COOKIE_KEY_USER_COLUMNS) || [
    'email',
    'first_name',
    'last_name',
    'building_name',
    'address',
    'apt_num',
    'zip_code',
];

const table_columns_user_withRender = JSON.parse(JSON.stringify(TABLE_COLUMNS_USER)).map(c => {
    return {
        ...c,
        render: ((row) => {
            if (row[c.field] === true) return '1';
            else if (row[c.field] === false) return '0';
            else return '' + row[c.field];
        })
    }
});

export const ManageUsersPage = ({history}) => {
    const [dialogColumnsOpen, setDialogColumnsOpen] = React.useState(false);
    const [visibleColumnFields, setVisibleColumnFields] = React.useState(initialVisibleFields);

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


    const columns = table_columns_user_withRender
        .filter(v => visibleColumnFields.includes(v.field));

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
            open={dialogColumnsOpen}
            onClose={handleClose}
            value={visibleColumnFields}
            setValue={handleColumnsChange}
            items={USERS_FIELDS}
        />
        <MaterialTable

            options={{
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
                {
                    icon: 'mail',
                    tooltip: 'Send Reset Password',
                    onClick: (event, {id}) => {
                        if (id && !users_SendSetUpPasswordById.pending) {
                            users_SendSetUpPasswordById.request(id)
                        }
                    }
                },
                {
                    icon: 'edit',
                    tooltip: 'Edit User',
                    onClick: (event, rowData) => {
                        history.push(`/${RoutingConstants.manageUsers}/${rowData.id}/edit`)
                    }
                },
                {
                    icon: 'book',
                    tooltip: 'Book',
                    onClick: (event, rowData) => {
                        history.push(`/${RoutingConstants.manageUsers}/${rowData.id}/book`)
                    }
                },

            ]}
            title="Manage Users"
            columns={columns}
            data={query =>
                request(query)
            }
        />
    </React.Fragment>

};
