import React from 'react';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {Footage_Title, Plan_DisabledForRegular, Plan_HasInitial, Plan_Title} from "../../constants/Enum";
// import {outOfNetworkFootage_InsertByData} from "../../api/Api";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FloatInput,} from "../../Base/BaseInput";
import {PriceCell, PriceCellEditable} from "../../Base/BasePriceCell";
import {Spinner} from "../../icons";


export const FootageTable = ({
                                 edition,
                                 setEdition,
                                 onSave,
                                 location_id,
                                 footage = []
                             }) => {
    const classes = useStyles();
    // const [edition, setEdition] = React.useState({});
    //
    // const update = (data) => {
    //     setEdition({...data, loading: true})
    //     outOfNetworkFootage_InsertByData(data)
    //         .then(r => reload())
    //         .then(r => {
    //             setEdition({});
    //         })
    // };

    return <div className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Plan</TableCell>
                    {Object.keys(Footage_Title).map(footage_key => <TableCell
                        key={footage_key}>{Footage_Title[footage_key]}</TableCell>)}
                </TableRow>
            </TableHead>
            <TableBody>

                {Object.keys(Plan_Title)
                    .filter(plan_key => !Plan_DisabledForRegular[plan_key])
                    .map(plan_key => <TableRow key={plan_key}>
                        <TableCell component="th" scope="row">
                            {Plan_Title[plan_key]}
                        </TableCell>
                        {Object.keys(Footage_Title).map(footage_key => (
                            edition.footage === footage_key && edition.plan === plan_key
                        )
                            ? (edition.loading ? <TableCell><Spinner/></TableCell> : <EditableCell
                                footage={footage_key}
                                plan={plan_key}
                                key={footage_key}
                                setEdition={setEdition}
                                edition={edition}
                                location_id={location_id}
                                update={onSave}
                                hasInitial={Plan_HasInitial[plan_key]}
                            />)
                            : <Cell
                                classes={classes}
                                items={footage || []}
                                footage={footage_key}
                                plan={plan_key}
                                key={footage_key}
                                setEdition={setEdition}
                                location_id={location_id}
                                hasInitial={Plan_HasInitial[plan_key]}
                            />)}

                    </TableRow>)}


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
}));
const EditableCell = ({edition, setEdition, update, footage, plan, location_id, hasInitial = true}) => {

    return <PriceCellEditable
        edition={{
            ...edition,
            hours: edition.hours,
            hours_initial: edition.hours_initial,
        }}
        setEdition={setEdition}
        update={
            state => update({
                    ...state,
                    footage,
                    location_id,
                    plan,
                    hours: state.hours || state.hours_initial,
                    hours_initial: hasInitial ? state.hours_initial || state.hours : 0,
                }
            )}
    >
        {({state, setState}) => (
            [
                <FloatInput
                    key={'hours'}
                    label={'hours'}
                    min={0}
                    setValue={hours => setState({hours})}
                    value={state.hours}
                />,
                hasInitial ? <FloatInput
                    key={'initial'}
                    label={'initial'}
                    min={0}
                    setValue={hours_initial => setState({hours_initial})}
                    value={state.hours_initial}
                /> : null,

            ]
        )}
    </PriceCellEditable>;
};

const Cell = ({items, footage, plan, classes, setEdition, location_id, hasInitial = true}) => {
    let hours = 0;
    let hours_initial = 0;
    items = items.filter(item => item.footage === footage && item.plan === plan);
    if (items.length >= 1) {
        hours = items[0].hours;
        hours_initial = items[0].hours_initial;
        if (items.length > 1) {
            console.error('footage pricing error: footage & plan of location duplicate');
        }
    }
    const onClick = () => location_id ? setEdition({footage, plan, hours, hours_initial, location_id}) : null;

    return <PriceCell onClick={onClick}>
        {
            () => <span>
                {hours || '-'}
                {
                    hasInitial
                        ? ' / ' + (hours_initial || '-')
                        : null
                }
            </span>
        }
    </PriceCell>;
};
