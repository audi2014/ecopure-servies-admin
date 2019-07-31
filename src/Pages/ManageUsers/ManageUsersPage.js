import React from "react";
import {apiContexts} from "../../api/ContextApi";
import MaterialTable from "material-table";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {VisibleColumnsDialog} from "./VisibleColumnsDialog";
import {initialVisibleFields, fieldsUser, TABLE_COLUMNS_USER} from "./columns";


export const ManageUsersPage = ({history}) => {
    const [dialogColumnsOpen, setDialogColumnsOpen] = React.useState(false);
    const [visibleColumnFields, setVisibleColumnFields] = React.useState(initialVisibleFields);

    function handleClose() {
        setDialogColumnsOpen(false);
    }

    function handleOpen() {
        setDialogColumnsOpen(true);
    }


    const columns = TABLE_COLUMNS_USER.filter(v => visibleColumnFields.includes(v.field));

    const onAddClick = () => history.push(`/${RoutingConstants.manageUsers}/add`);
    const {users_GetPage} = React.useContext(apiContexts.users);
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
    // React.useEffect(() => {
    //     request();
    // }, []);

    // return JSON.stringify(users_GetPage.state);
    return <React.Fragment>
        <VisibleColumnsDialog
            open={dialogColumnsOpen}
            onClose={handleClose}
            value={visibleColumnFields}
            setValue={setVisibleColumnFields}
            items={fieldsUser}
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
