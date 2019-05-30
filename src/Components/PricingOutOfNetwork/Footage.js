import React from 'react';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {Footage_Title, PlanOutNetwork_Title} from "../../constants/Enum";
import {outOfNetworkFootage_InsertByData} from "../../api/Api";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {CancelButton, FloatInput, Select, SubmitButton} from "../../Base/BaseInput";

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
    }
}));
const EditableCell = ({edition, setEdition, update, footage, plan, location_id}) => {

    const [hours, setHours] = React.useState(edition.hours ? edition.hours : 0);
    const [hoursInitial, setHoursInitial] = React.useState(edition.hoursInitial ? edition.hoursInitial : 0);
    const onCancelClick = () => setEdition({});

    return <TableCell>
        <form onSubmit={e => {
            e.preventDefault();
            const data = {
                hours: hours || 0,
                hoursInitial: setHoursInitial || 0,
                footage,
                plan,
                location_id
            };
            update(data);
        }}>

            <FloatInput
                label={'hours'}
                min={0}
                setValue={setHours}
                value={hours}
            />
            <FloatInput
                label={'initial'}
                min={0}
                setValue={setHoursInitial}
                value={hoursInitial}
            />
            <CancelButton onClick={onCancelClick}/>
            <SubmitButton/>
        </form>

    </TableCell>
};

const Cell = ({items, footage, plan, classes, setEdition, location_id}) => {
    let hours = 0;
    let hoursInitial = 0;
    items = items.filter(item => item.footage === footage && item.plan === plan);
    if (items.length >= 1) {
        hours = items[0].hours;
        hoursInitial = items[0].hoursInitial;
        if (items.length > 1) {
            console.error('footage pricing error: footage & plan of location duplicate');
        }
    }
    const onClick = () => location_id ? setEdition({footage, plan, hours, hoursInitial, location_id}) : null;

    return <TableCell className={classes.cell} onClick={onClick}>
        <span>{hours || '-'} </span>
        /
        <span>{hoursInitial || '-'}</span>
    </TableCell>
}

export const FootageTable = (props) => {
    const classes = useStyles();
    const [edition, setEdition] = React.useState({});

    const update = (data) => {
        setEdition({...data, loading: true})
        outOfNetworkFootage_InsertByData(data)
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
                    <TableCell>Plan</TableCell>
                    {Object.keys(Footage_Title).map(footage_key => <TableCell
                        key={footage_key}>{Footage_Title[footage_key]}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>

                {Object.keys(PlanOutNetwork_Title).map(plan_key => <TableRow key={plan_key}>
                    <TableCell component="th" scope="row">
                        {PlanOutNetwork_Title[plan_key]}
                    </TableCell>
                    {Object.keys(Footage_Title).map(footage_key => (
                        edition.footage === footage_key && edition.plan === plan_key
                    )
                        ? (edition.loading ? 'loading...' : <EditableCell
                            footage={footage_key}
                            plan={plan_key}
                            key={footage_key}
                            setEdition={setEdition}
                            edition={edition}
                            location_id={props.selectedId}
                            update={update}
                        />)
                        : <Cell
                            classes={classes}
                            items={props.item.footage || []}
                            footage={footage_key}
                            plan={plan_key}
                            key={footage_key}
                            setEdition={setEdition}
                            location_id={props.selectedId}
                        />)}

                </TableRow>)}


            </TableBody>
        </Table></div>;

};
