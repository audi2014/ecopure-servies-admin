import React from 'react';
import MaterialTable from "material-table";
import {FloatInput, MoneyInput} from "../../Base/BaseInput";
import {apiContexts} from "../../api/ContextApi";
import {centsToDollars, dollarsToCents} from "../../Base/tools";


export const ExtraFootageTable = ({location_id}) => {

    const {
        inNetworkExtraFootage_DeleteById,
        inNetworkExtraFootage_GetByLocationId,
        inNetworkExtraFootage_InsertByData,
        inNetworkExtraFootage_UpdateById
    } = React.useContext(apiContexts.inNetworkExtraFootage);


    const [state, setState] = React.useState({
        columns: [
            {
                title: 'Min Footage',
                field: 'min_footage',
                editComponent: EditFootage,
                render: rowData => '≥ ' + rowData.min_footage + ' sq.ft'
            },
            {
                title: 'Amount',
                field: 'dollars',
                editComponent: EditDollars,
                render: rowData => '$' + rowData.dollars
            },
        ],
        data: [],
    });

    return (
        <MaterialTable
            key={location_id}
            options={{
                paging: false,
                search: false,
            }}
            title="Extra footage Pricing"
            columns={state.columns}
            data={makeGetData({request: inNetworkExtraFootage_GetByLocationId.request, location_id})}
            editable={{
                onRowAdd: makeInsertData({
                    request: inNetworkExtraFootage_InsertByData.request,
                    state,
                    setState,
                    location_id
                }),
                onRowUpdate: makeUpdateData({
                    request: inNetworkExtraFootage_UpdateById.request,
                    state,
                    setState
                }),
                onRowDelete: makeDeleteData({
                    request: inNetworkExtraFootage_DeleteById.request,
                    state,
                    setState
                }),
            }}
        />
    );
};

const mapItemCentToDollar = item => {
    return {...item, cents: undefined, dollars: centsToDollars(item.cents)}
};
const mapItemDollarToCent = item => {
    return {...item, dollars: undefined, cents: dollarsToCents(item.dollars)}
};


const makeGetData = ({request, location_id}) =>
    () => request(location_id)
        .then(result => result.map(mapItemCentToDollar))
        .then(result => {
            return {data: result,};
        });

const makeInsertData = ({request, state, setState, location_id}) =>
    rowData =>
        request(mapItemDollarToCent({
            ...rowData,
            location_id
        }))
            .then(result => {
                const data = [...state.data, mapItemCentToDollar(result)];
                setState({...state, data: data});
            });

const makeDeleteData = ({request, state, setState,}) =>
    rowData =>
        request(rowData.id)
            .then(r => {
                const data = state.data
                    .filter(item => +item.id !== +rowData.id);
                setState({...state, data});
            });

const makeUpdateData = ({request, state, setState,}) =>
    rowData =>
        console.log(rowData,mapItemDollarToCent(rowData)) || request(rowData.id, mapItemDollarToCent(rowData))
            .then(result => {
                const data = state.data.filter(item => +item.id !== +rowData.id);
                data.push(mapItemCentToDollar(result));
                setState({...state, data});
            });


const EditDollars = ({rowData, value, onChange}) => <MoneyInput
    min={0}
    value={value || rowData.dollars || 0}
    setValue={onChange}
/>;
const EditFootage = ({rowData, value, onChange}) => <FloatInput
    min={0}
    value={value || rowData.min_footage || 0}
    setValue={onChange}
/>;


