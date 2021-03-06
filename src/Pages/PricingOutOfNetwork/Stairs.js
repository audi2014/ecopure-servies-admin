import React from 'react';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Stairs_Title} from "../../constants/Enum";
import {MoneyInput} from "../../Base/BaseInput";
import {PriceCell, PriceCellEditable} from "../../Base/BasePriceCell";
import {Spinner} from "../../icons";
import {centsToDollars, dollarsToCents} from "../../Base/tools";

export const StairsTable = ({
                                edition,
                                setEdition,
                                onSave,
                                location_id,
                                stairs = []
                            }) => {
    const classes = useStyles();

    return <div className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Stairs</TableCell>
                    <TableCell>Amount per hour</TableCell>

                </TableRow>
            </TableHead>
            <TableBody>

                {Object.keys(Stairs_Title).map(stairs_key =>
                    <TableRow key={stairs_key}>
                        <TableCell>{Stairs_Title[stairs_key]}</TableCell>
                        {
                            edition.stairs === stairs_key
                                ? (
                                    edition.loading
                                        ? <TableCell><Spinner/></TableCell>
                                        : <EditableCell
                                            classes={classes}
                                            stairs={stairs_key}
                                            key={stairs_key}
                                            setEdition={setEdition}
                                            edition={edition}
                                            location_id={location_id}
                                            update={onSave}
                                        />
                                )
                                : <Cell
                                    classes={classes}
                                    items={stairs || []}
                                    stairs={stairs_key}
                                    key={stairs_key}
                                    setEdition={setEdition}
                                    location_id={location_id}
                                />
                        }
                    </TableRow>
                )}
            </TableBody>
        </Table></div>;

};

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
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
const EditableCell = ({edition, setEdition, update, stairs, location_id, classes}) => {

    return <PriceCellEditable
        edition={{
            ...edition,
            dollars: centsToDollars(edition.cents_per_hour),
            cents_per_hour: undefined
        }}
        setEdition={setEdition}
        update={
            state => update({
                    ...state,
                    stairs,
                    location_id,
                    dollars: undefined,
                    cents_per_hour: dollarsToCents(state.dollars)
                }
            )}
    >
        {({state, setState}) => <MoneyInput
            className={classes.textField}
            setValue={dollars => setState({dollars})}
            value={state.dollars}
        />}
    </PriceCellEditable>;
};

const Cell = ({items, stairs, classes, setEdition, location_id}) => {
    let cents_per_hour = 0;
    items = items.filter(item => item.stairs === stairs);
    if (items.length >= 1) {
        cents_per_hour = items[0].cents_per_hour;
        if (items.length > 1) {
            console.error('items pricing error: stairs of location duplicate');
        }
    }
    const onClick = () => location_id ? setEdition({stairs, cents_per_hour, location_id}) : null;

    return <PriceCell onClick={onClick}>
        {
            () => <span>{cents_per_hour ? '$' + centsToDollars(cents_per_hour) : '-'}</span>
        }
    </PriceCell>;
};
