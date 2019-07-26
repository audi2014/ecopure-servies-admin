import React from "react";
import {apiContexts} from "../../api/ContextApi";
import MaterialTable from "material-table";

const columns = [
    {title: 'Email', field: 'email',},
    {title: 'First Name', field: 'first_name',},
    {title: 'Last Name', field: 'last_name',},
    {title: 'Building Name', field: 'building_name',},
    {title: 'Address', field: 'address',},
    {title: 'Apt', field: 'apt_num',},
    {title: 'Zip Code', field: 'zip_code',},
];

export const ManageUsersTable = ({}) => {
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
    return <MaterialTable
        options={{
            filtering: true,
            pageSize: 20,
            exportAllData: true,
            exportButton: true,
            pageSizeOptions: [20, 30, 50]
        }}
        title="Manage Users"
        columns={columns}
        data={query =>
            request(query)
        }
    />

};
