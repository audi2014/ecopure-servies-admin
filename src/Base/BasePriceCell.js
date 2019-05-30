// import React from "react";
// import TableCell from "@material-ui/core/TableCell/TableCell";
// import {CancelButton, MoneyInput, SubmitButton} from "./BaseInput";
//
// const EditableCell = ({edition, setEdition, update, disabled, hasInitial, formClassName}) => {
//
//
//     const [dollars, setDollars] = React.useState(edition.cents ? (edition.cents / 100).toFixed(2) : 0);
//     const [dollarsInitial, setDollarsInitial] = React.useState(edition.centsInitial ? (edition.centsInitial / 100).toFixed(2) : 0);
//
//     const onCancelClick = () => setEdition({});
//
//     return <TableCell>
//         <form className={formClassName} onSubmit={e => {
//             e.preventDefault();
//             const data = {
//                 cents: Math.round(dollars * 100) || 0,
//                 centsInitial: hasInitial ? (Math.round(dollarsInitial * 100) || 0) : 0,
//                 room_type,
//                 plan,
//                 building_id
//             };
//             update(data);
//         }}>
//             <MoneyInput label={'price'} setValue={setDollars} value={dollars}/>
//             {
//                 hasInitial
//                     ? <MoneyInput label={'initial'} setValue={setDollarsInitial} value={dollarsInitial}/>
//                     : null
//             }
//             <CancelButton onClick={onCancelClick}/>
//             <SubmitButton/>
//         </form>
//
//     </TableCell>
// };
//
// const Cell = ({items, room_type, plan, classes, setEdition, building_id, disabled, hasInitial}) => {
//     if (disabled) return <TableCell/>;
//     let cents = 0;
//     let centsInitial = 0;
//     items = items.filter(item => item.room_type === room_type && item.plan === plan);
//     if (items.length >= 1) {
//         cents = items[0].cents;
//         centsInitial = items[0].centsInitial;
//         if (items.length > 1) {
//             console.error('room_type pricing error: room_type & plan of building duplicate');
//         }
//     }
//     const onClick = () => building_id ? setEdition({room_type, plan, cents, centsInitial, building_id}) : null;
//
//
//     return <TableCell className={classes.cell} onClick={onClick}>
//         <span>{cents ? '$' + (cents / 100).toFixed(2) : '-'}</span>
//         {hasInitial ?
//             <span>/{centsInitial ? '$' + (centsInitial / 100).toFixed(2) : '-'}</span>
//             : null
//         }
//
//     </TableCell>
// }