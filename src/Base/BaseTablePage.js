import MaterialTable from "material-table";
import React from "react";
import {withTheme} from "../Theme";
import {StylesProvider, createGenerateClassName} from '@material-ui/styles';
import Fab from "@material-ui/core/Fab/Fab";
import {AddIcon} from "../icons";

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


const MaterialBaseTablePage = (({
                             options = defaultOptions,
                             fetchItems = defaultFetch,
                             staticData = false,
                             columns = defaultColumns,
                             renderTitle = null,
                             onAddClick = null,
                             ...rest
                         }) => {

    const data = staticData === false
        ? (query) => fetchItems(query)
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
        : staticData

    return <MaterialTable
        {...rest}
        options={options}
        title={<span style={{
            display: 'flex',
            alignItems: 'baseline',
        }}>
            {renderTitle ? renderTitle() : defaultTitle}
            {
                onAddClick ?
                    <Fab onClick={onAddClick} style={{margin: 10}} size="small" color="primary"
                         aria-label="Create">
                        <AddIcon/>
                    </Fab> : null
            }
        </span>}
        columns={columns}
        data={data}
    />
});

export const BaseTablePage = withTheme(
    props => (
        <StylesProvider generateClassName={generateClassName}>
            <MaterialBaseTablePage {...props}/>
        </StylesProvider>
    )
);