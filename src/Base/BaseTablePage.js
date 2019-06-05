import MaterialTable from "material-table";
import React from "react";

import {MuiThemeProvider} from '@material-ui/core/styles';
import {theme} from "../Template";
import {withTheme} from "../Theme";


import {StylesProvider, createGenerateClassName} from '@material-ui/styles';

const generateClassName = createGenerateClassName({
    productionPrefix: 'mt',
    seed: 'mt'
});

const defaultFetch = () => new Promise((resolve) => resolve([{count: 1}]));
const defaultOptions = {
    paging: false,
    search: false,
};
const defaultColumns = [{
    title: 'Title',
    field: 'count',
    render: rowData => rowData.count
}];
const defaultTitle = 'Table Title';


const _BaseTablePage = (({
                             options = defaultOptions,
                             fetchItems = defaultFetch,
                             columns = defaultColumns,
                             title = defaultTitle,
                             ...rest
                         }) => {

    return <MaterialTable

        options={options}
        title={title}
        columns={columns}
        data={
            (query) => fetchItems(query)
                .then(items => {
                    if (items) {
                        return items.sort((a, b) => {
                            if (!!a.deleted_at === b.deleted_at) {
                                return a.id - b.id
                            } else {
                                return !!a.deleted_at - !!b.deleted_at
                            }
                        })
                    }
                })
                .then(data => data ? {data} : {data: []})
        }
        {...rest}
    />
});

export const BaseTablePage = withTheme(
    props => (
        <StylesProvider generateClassName={generateClassName}>
            <_BaseTablePage {...props}/>
        </StylesProvider>
    )
);