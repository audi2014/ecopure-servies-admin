import React from 'react';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {outOfNetworkStairs_InsertByData} from "../../api/Api";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Stairs_Title} from "../../constants/Enum";
import {CancelButton, MoneyInput, SubmitButton} from "../../Base/BaseInput";

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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));
const EditableCell = ({edition, setEdition, update, stairs, location_id,classes}) => {
    const [dollars, setDollars] = React.useState(edition.cents_per_hour ? (edition.cents_per_hour / 100).toFixed(2) : 0);

    const onCancelClick = () => setEdition({});

    return <TableCell>
        <form className={classes.container} onSubmit={e => {
            e.preventDefault();
            const data = {
                cents_per_hour: Math.round(dollars * 100) || 0,
                stairs,
                location_id
            };
            update(data);
        }}>
            <MoneyInput setValue={setDollars} value={dollars}/>
            <CancelButton onClick={onCancelClick}/>
            <SubmitButton/>
        </form>

    </TableCell>
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

    return <TableCell className={classes.cell} onClick={onClick}>
        <span>{cents_per_hour ? '$' + (cents_per_hour / 100).toFixed(2) : '-'}</span>
    </TableCell>
};

export const StairsTable = (props) => {
    const classes = useStyles();
    const [edition, setEdition] = React.useState({});

    const update = (data) => {
        setEdition({...data, loading: true})
        outOfNetworkStairs_InsertByData(data)
            .then(r => props.reload())
            .then(r => {
                setEdition({});
            })
    };

    return <div className={classes.root}>
        {/*<p>{JSON.stringify(Object.keys(props))} <br/>{JSON.stringify(props)}</p>*/}
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
                                        ? 'loading...'
                                        : <EditableCell
                                            classes={classes}
                                            stairs={stairs_key}
                                            key={stairs_key}
                                            setEdition={setEdition}
                                            edition={edition}
                                            location_id={props.selectedId}
                                            update={update}
                                        />
                                )
                                : <Cell
                                    classes={classes}
                                    items={props.item.stairs || []}
                                    stairs={stairs_key}
                                    key={stairs_key}
                                    setEdition={setEdition}
                                    location_id={props.selectedId}
                                />
                        }
                    </TableRow>
                )}
            </TableBody>
        </Table></div>;

};
