import React from 'react';
import Table from "@material-ui/core/Table/Table";
import TableHead from "@material-ui/core/TableHead/TableHead";
import TableRow from "@material-ui/core/TableRow/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody/TableBody";
import {
    AddOnValueType_Title,
    Plan_HasInitial,
    PLAN_OCCASIONAL,
    Plan_Title,
    RoomType_Title
} from "../../constants/Enum";
import {inNetworkPrices_GetByModelId, inNetworkPrices_InsertByData} from "../../api/Api";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {MoneyInput,} from "../../Base/BaseInput";
import {centsToDollars, dollarsToCents, PriceCell, PriceCellEditable} from "../../Base/BasePriceCell";
import {Spinner} from "../../icons";
import {makeUsingLoadingById} from "../tools";
import {ImportInnetwork} from "./ImportInnetwork";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
}));
const EditableCell = ({edition, setEdition, update, room_type, plan, custom_pricing_model_id, location_id, classes, disabled, hasInitial}) => {

    return <PriceCellEditable
        edition={{
            ...edition,
            dollars: centsToDollars(edition.cents),
            dollarsInitial: centsToDollars(hasInitial ? edition.centsInitial : 0),
            cents: undefined,
            centsInitial: undefined,
        }}
        setEdition={setEdition}
        update={
            state => update({
                    ...state,
                    room_type,
                    custom_pricing_model_id,
                    location_id,
                    plan,
                    dollars: undefined,
                    dollarsInitial: undefined,
                    cents: dollarsToCents(state.dollars || state.dollarsInitial),
                    centsInitial: hasInitial ? dollarsToCents(state.dollarsInitial || state.dollars) : 0,
                }
            )}
        formClassName={classes.container}
    >
        {({state, setState}) => (
            [
                <MoneyInput
                    key={'price'}
                    label={'price'}
                    setValue={dollars => setState({dollars})}
                    value={state.dollars}
                />,

                hasInitial
                    ? <MoneyInput
                        key={'initial'}
                        label={'initial'}
                        setValue={dollarsInitial => setState({dollarsInitial})}
                        value={state.dollarsInitial}/>
                    : null

            ]
        )}
    </PriceCellEditable>;
};

const Cell = ({items, room_type, plan, classes, setEdition, custom_pricing_model_id, location_id, disabled, hasInitial}) => {
    if (disabled) return <TableCell/>;
    const onClick = () => (location_id && custom_pricing_model_id)
        ? setEdition({room_type, plan, cents, centsInitial, custom_pricing_model_id, location_id})
        : null;
    let cents = 0;
    let centsInitial = 0;
    items = items.filter(item => item.room_type === room_type && item.plan === plan && +item.custom_pricing_model_id === +custom_pricing_model_id);
    if (items.length >= 1) {
        cents = items[0].cents;
        centsInitial = items[0].centsInitial;
        if (items.length > 1) {
            console.error('room_type pricing error: room_type & plan of model duplicate');
        }
    }

    return <PriceCell onClick={onClick}>
        {
            () => <span>
                {cents ? '$' + centsToDollars(cents) : '-'}
                {hasInitial ? (' / ' + (centsInitial ? '$' + centsToDollars(centsInitial) : '-')) : null}
                </span>
        }
    </PriceCell>
};


const use_load_inNetworkPrices_GetByModelId = makeUsingLoadingById(inNetworkPrices_GetByModelId)
export const RoomTypePlanTable = ({location_id, custom_pricing_model_id}) => {

    const [pricingInNetwork, _, reload] = use_load_inNetworkPrices_GetByModelId(custom_pricing_model_id);
    const classes = useStyles();
    const [edition, setEdition] = React.useState({});
    if (pricingInNetwork === false) return 'error.';
    if (!pricingInNetwork) return <Spinner/>;


    const items = pricingInNetwork || [];
    const plan_cents = Object.keys(Plan_Title)
        .reduce((prev, plan) => {
            prev[plan] = items
                .filter(i => i.plan === plan)
                .reduce(
                    (sum, item) => sum += ((+item.cents || 0) + (+item.centsInitial || 0)),
                    0
                );
            return prev;
        }, {});


    const update = (data) => {
        setEdition({...data, loading: true})
        inNetworkPrices_InsertByData(data)
            .then(r => reload())
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

                {Object.keys(Plan_Title).map(plan_key => {

                    return <TableRow key={plan_key}>
                        <TableCell
                            component="th"
                            scope="row"
                            style={{textDecoration: !plan_cents[plan_key] ? 'line-through' : undefined}}
                        >
                            {Plan_Title[plan_key]}
                        </TableCell>
                        {Object.keys(RoomType_Title).map(roomType_key => (
                            edition.room_type === roomType_key && edition.plan === plan_key
                        )
                            ? (edition.loading ? <TableCell key={roomType_key}><Spinner/></TableCell> : <EditableCell
                                classes={classes}
                                room_type={roomType_key}
                                plan={plan_key}
                                key={roomType_key}
                                setEdition={setEdition}
                                edition={edition}
                                location_id={location_id}
                                custom_pricing_model_id={custom_pricing_model_id}
                                update={update}
                                hasInitial={Plan_HasInitial[plan_key]}
                            />)
                            : <Cell
                                classes={classes}
                                items={items}
                                room_type={roomType_key}
                                plan={plan_key}
                                key={roomType_key}
                                setEdition={setEdition}
                                location_id={location_id}
                                custom_pricing_model_id={custom_pricing_model_id}
                                hasInitial={Plan_HasInitial[plan_key]}
                            />)}

                    </TableRow>
                })}


            </TableBody>
        </Table>
        <ImportInnetwork
            pricingInNetwork={pricingInNetwork || []}
            custom_pricing_model_id={custom_pricing_model_id}
            reload={reload}
            location_id={location_id}
        />
    </div>;

};
