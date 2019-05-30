import React from 'react';

import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {AddOn_Title, AddOnValueType_Title} from "../../constants/Enum";
import {addOn_InserByData, inNetwork_InsertByData} from "../../api/Api";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CancelButton, MoneyInput, Select, SubmitButton} from "../../Base/BaseInput";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    cell: {
        '&:hover': {
            backgroundColor: '#C3C3C3'
        }
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

    const [value_type, setValueType] = React.useState(edition.value_type || '');
    const [dollars, setDollars] = React.useState(edition.cents ? (edition.cents / 100).toFixed(2) : 0);

    const onCancelClick = () => setEdition({});

    return <TableCell>
        <form noValidate autoComplete="off" onSubmit={e => {
            e.preventDefault();
            const data = {
                cents: Math.round(dollars * 100) || 0,
                value_type: e.currentTarget[1].value,
                addon_type,
                location_id
            };
            update(data);
        }}>
            <div className={classes.container}>
                <MoneyInput className={classes.textField} setValue={setDollars} value={dollars}/>
                <Select
                    className={classes.textField}
                    menuClassName={classes.menu}
                    setValue={setValueType}
                    value={value_type}
                    keyValue={AddOnValueType_Title}
                />
            </div>
            <div className={classes.container}>
                <CancelButton onClick={onCancelClick}/>
                <SubmitButton/>
            </div>

        </form>
    </TableCell>
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

    return <TableCell className={classes.cell} onClick={onClick}>
        <span>{cents ? '$' + (cents / 100).toFixed(2) : '-'}</span>
        /
        <span>{AddOnValueType_Title[value_type] || '-'}</span>
    </TableCell>
}

export const AddOnTable = (props) => {
    const classes = useStyles();
    const [edition, setEdition] = React.useState({});

    const update = (data) => {
        setEdition({...data, loading: true})
        addOn_InserByData(data)
            .then(r => props.reload())
            .then(r => {
                setEdition({});
            })
    };

    return <Paper className={classes.root}>
        <Typography style={{margin:20}} variant="h6">Add-On Pricing</Typography>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Add-On</TableCell>
                    <TableCell>Price/Type</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>

                {Object.keys(AddOn_Title).map(addOnType_key => <TableRow key={addOnType_key}>
                    <TableCell component="th" scope="row">
                        {AddOn_Title[addOnType_key]}
                    </TableCell>
                    {
                        edition.addon_type === addOnType_key

                            ? (edition.loading ? 'loading...' : <EditableCell
                                classes={classes}
                                addon_type={addOnType_key}
                                key={addOnType_key}
                                setEdition={setEdition}
                                edition={edition}
                                location_id={props.selectedId}
                                update={update}
                            />)
                            : <Cell
                                classes={classes}
                                addon_type={addOnType_key}
                                key={addOnType_key}
                                setEdition={setEdition}
                                location_id={props.selectedId}
                                items={props.item || []}
                            />
                    }

                </TableRow>)}


            </TableBody>
        </Table></Paper>;

};
