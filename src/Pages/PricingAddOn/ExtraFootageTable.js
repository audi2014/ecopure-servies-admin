import React from 'react';
import MaterialTable from "material-table";
import {FloatInput, MoneyInput} from "../../Base/BaseInput";
import {
    inNetworkExtraFootage_DeleteById,
    inNetworkExtraFootage_GetByLocationId,
    inNetworkExtraFootage_InsertByData, inNetworkExtraFootage_UpdateById
} from "../../api/Api";


const mapItemCentToDollar = item => {
    return {...item, cents: undefined, dollars: (item.cents / 100).toFixed(2)}
};
const mapItemDollarToCent = item => {
    return {...item, dollars: undefined, cents: Math.round(item.cents * 100)}
};
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

const getData = ({location_id}) => inNetworkExtraFootage_GetByLocationId(location_id)
    .then(result => result.map(mapItemCentToDollar))
    .then(result => {
        return {data: result,};
    });
const insertData = ({state, setState, rowData}) => inNetworkExtraFootage_InsertByData(mapItemDollarToCent(rowData))
    .then(result => {
        const data = [...state.data, mapItemCentToDollar(result)];
        setState({...state, data: data});
    });
const deleteData = ({state, setState, rowData}) => inNetworkExtraFootage_DeleteById(rowData.id)
    .then(r => {
        const data = state.data
            .filter(item => +item.id !== +rowData.id);
        setState({...state, data});
    });

const updateData = ({state, setState, rowData}) => inNetworkExtraFootage_UpdateById(rowData.id, mapItemDollarToCent(rowData)
).then(result => {
    const data = state.data.filter(item => +item.id !== +rowData.id);
    data.push(mapItemCentToDollar(result));
    setState({...state, data});
});


export const ExtraFootageTable = ({location_id}) => {
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
                field: 'cents',
                editComponent: EditDollars,
                render: rowData => '$' + rowData.dollars
            },
        ],
        data: [],
    });

    return (
            <MaterialTable
                options={{
                    paging: false,
                    search: false,
                }}
                title="Extra footage Pricing"
                columns={state.columns}
                data={() => getData({location_id})}
                editable={{
                    onRowAdd: rowData => insertData({state, setState, rowData: {...rowData, location_id}}),
                    onRowUpdate: rowData => updateData({state, setState, rowData}),
                    onRowDelete: rowData => deleteData({state, setState, rowData}),
                }}
            />
    );
};
