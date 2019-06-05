import React from 'react';

import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {AddOn_Title, AddOnValueType_Title} from "../../constants/Enum";
import {addOn_InserByData} from "../../api/Api";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {MoneyInput, Select} from "../../Base/BaseInput";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import {centsToDollars, dollarsToCents, PriceCell, PriceCellEditable} from "../../Base/BasePriceCell";
import {Spinner} from "../../icons";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    menu: {
        width: 200,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));


const EditableCell = ({edition, setEdition, update, addon_type, location_id, classes}) => {
    return <PriceCellEditable
        tooltipClassName={classes.container}
        edition={{
            ...edition,
            dollars: centsToDollars(edition.cents),
            cents: undefined
        }}
        setEdition={setEdition}
        update={
            state => update({
                    ...state,
                    addon_type,
                    location_id,
                    dollars: undefined,
                    cents: dollarsToCents(state.dollars)
                }
            )}
        formClassName
    >
        {({state, setState}) => (
            <div className={classes.container}>
                <MoneyInput
                    className={classes.textField}
                    setValue={dollars => setState({dollars})}
                    value={state.dollars}
                />
                <Select
                    label={'Type'}
                    className={classes.textField}
                    menuClassName={classes.menu}
                    setValue={value_type => setState({value_type})}
                    value={state.value_type}
                    keyValue={AddOnValueType_Title}
                />
            </div>
        )}
    </PriceCellEditable>
};

const Cell = ({items, addon_type, classes, setEdition, location_id}) => {
    let cents = 0;
    let value_type = null;
    items = items.filter(item => item.addon_type === addon_type);
    if (items.length >= 1) {
        cents = items[0].cents;
        value_type = items[0].value_type;
        if (items.length > 1) {
            console.error('room_type pricing error: room_type & plan of building duplicate');
        }
    }
    const onClick = () => location_id ? setEdition({addon_type, cents, location_id, value_type}) : null;

    return <PriceCell onClick={onClick}>
        {
            () => <span>{
                cents ? '$' + centsToDollars(cents) : '-'
            } / {
                cents && AddOnValueType_Title[value_type] || '-'
            }</span>
        }
    </PriceCell>
};

export const AddOnTable = ({reload, location_id, addons=[]}) => {
    const classes = useStyles();
    const [edition, setEdition] = React.useState({});

    const update = (data) => {
        setEdition({...data, loading: true})
        addOn_InserByData(data)
            .then(r => reload())
            .then(r => {
                setEdition({});
            })
    };

    return <Paper className={classes.root}>
        <Typography style={{margin: 20}} variant="h6">Add-On Pricing</Typography>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Add-On</TableCell>
                    <TableCell>Price/Type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {Object.keys(AddOn_Title).map(addOnType_key => <TableRow key={addOnType_key} className={classes.row}>
                    <TableCell component="th" scope="row">
                        {AddOn_Title[addOnType_key]}
                    </TableCell>
                    {
                        edition.addon_type === addOnType_key

                            ? (edition.loading ? <TableCell><Spinner/></TableCell> : <EditableCell
                                classes={classes}
                                addon_type={addOnType_key}
                                key={addOnType_key}
                                setEdition={setEdition}
                                edition={edition}
                                location_id={location_id}
                                update={update}
                            />)
                            : <Cell
                                classes={classes}
                                addon_type={addOnType_key}
                                key={addOnType_key}
                                setEdition={setEdition}
                                location_id={location_id}
                                items={addons || []}
                            />
                    }

                </TableRow>)}


            </TableBody>
        </Table></Paper>;

};
