import React from 'react';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {PlanInNetwork_Title, RoomType_Title} from "../../constants/Enum";
import {inNetwork_InsertByData} from "../../api/Api";
import makeStyles from "@material-ui/core/styles/makeStyles";
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
// const EditableCell = () => "EditableCell"
const EditableCell = ({edition, setEdition, update, room_type, plan, building_id,classes}) => {


    const [dollars, setDollars] = React.useState(edition.cents ? (edition.cents / 100).toFixed(2) : 0);
    const [dollarsInitial, setDollarsInitial] = React.useState(edition.centsInitial ? (edition.centsInitial / 100).toFixed(2) : 0);

    const onCancelClick = () => setEdition({});

    return <TableCell>
        <form className={classes.container} onSubmit={e => {
            e.preventDefault();
            const data = {
                cents: Math.round(dollars * 100) || 0,
                centsInitial: Math.round(dollarsInitial * 100) || 0,
                room_type,
                plan,
                building_id
            };
            update(data);
        }}>
            <MoneyInput label={'price'} setValue={setDollars} value={dollars}/>
            <MoneyInput label={'initial'} setValue={setDollarsInitial} value={dollarsInitial}/>
            <CancelButton onClick={onCancelClick}/>
            <SubmitButton/>
        </form>

    </TableCell>
};

const Cell = ({items, room_type, plan, classes, setEdition, building_id}) => {
    let cents = 0;
    let centsInitial = 0;
    items = items.filter(item => item.room_type === room_type && item.plan === plan);
    if (items.length >= 1) {
        cents = items[0].cents;
        centsInitial = items[0].centsInitial;
        if (items.length > 1) {
            console.error('room_type pricing error: room_type & plan of building duplicate');
        }
    }
    const onClick = () => building_id ? setEdition({room_type, plan, cents, centsInitial, building_id}) : null;

    return <TableCell className={classes.cell} onClick={onClick}>
        <span>{cents ? '$' + (cents / 100).toFixed(2) : '-'}</span>
        /
        <span>{centsInitial ? '$' + (centsInitial / 100).toFixed(2) : '-'}</span>
    </TableCell>
}

export const RoomTypePlanTable = (props) => {
    const classes = useStyles();
    const [edition, setEdition] = React.useState({});

    const update = (data) => {
        setEdition({...data, loading: true})
        inNetwork_InsertByData(data)
            .then(r => props.reload())
            .then(r => {
                setEdition({});
            })
    };

    return <div className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Plan</TableCell>
                    {Object.keys(RoomType_Title).map(roomType_key => <TableCell
                        key={roomType_key}>{RoomType_Title[roomType_key]}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>

                {Object.keys(PlanInNetwork_Title).map(plan_key => <TableRow key={plan_key}>
                    <TableCell component="th" scope="row">
                        {PlanInNetwork_Title[plan_key]}
                    </TableCell>
                    {Object.keys(RoomType_Title).map(roomType_key => (
                        edition.room_type === roomType_key && edition.plan === plan_key
                    )
                        ? (edition.loading ? 'loading...' : <EditableCell
                            classes={classes}
                            room_type={roomType_key}
                            plan={plan_key}
                            key={roomType_key}
                            setEdition={setEdition}
                            edition={edition}
                            building_id={props.selectedId}
                            update={update}
                        />)
                        : <Cell
                            classes={classes}
                            items={props.item.main || []}
                            room_type={roomType_key}
                            plan={plan_key}
                            key={roomType_key}
                            setEdition={setEdition}
                            building_id={props.selectedId}
                        />)}

                </TableRow>)}


            </TableBody>
        </Table></div>;

};
