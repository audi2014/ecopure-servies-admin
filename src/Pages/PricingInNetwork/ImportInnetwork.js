// import React from 'react';
// import {Select} from "../../Base/BaseInput";
// import {Done} from "@material-ui/icons";
// import Button from "@material-ui/core/Button/Button";
// import {
//     buildingsLarge_GetByLocationId,
//     inNetworkPrices_DeleteById,
//     inNetworkPrices_GetByBuildingId,
//     inNetworkPrices_InsertByData
// } from "../../api/Api";
// import {makeUsingLoadingById} from "../tools";
// import Grid from "@material-ui/core/Grid/Grid";
// import FormControl from "@material-ui/core/FormControl/FormControl";
// import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
// import {Spinner} from "../../icons";
// import {PromiseAllWithProgress} from "../../Base/tools";
// import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
//
//
// const use_load_buildingsLarge_GetByLocationId = makeUsingLoadingById(buildingsLarge_GetByLocationId);
//
//
// export const ImportInnetwork = ({location_id, building_id, reload, pricingInNetwork = []}) => {
//     const [buildings,] = use_load_buildingsLarge_GetByLocationId(location_id);
//     const [selected_building_id, setSelectedId] = React.useState(null);
//     const [progress, setProgress] = React.useState(false);
//     const LBuildingId_Name = (buildings || [])
//         .filter(b => +b.id !== +building_id)
//         .sort((a, b) => a.name.localeCompare(b.name))
//         .reduce((prev, b) => {
//             prev[b.id] = `${b.name || '#' + b.id}, ${b.address}`
//             return prev;
//         }, {});
//
//     const onClick = () => {
//         setProgress(-1);
//         inNetworkPrices_GetByBuildingId(selected_building_id).then(copyItems => {
//             return PromiseAllWithProgress(
//                 pricingInNetwork.map(p => inNetworkPrices_DeleteById(p.id)),
//                 v => setProgress(v ? -v : -1)
//             ).then(
//                 r => PromiseAllWithProgress(
//                     copyItems.map(item => {
//                         const {id, created_at, updated_at, deleted_at, ...body} = item
//                         return inNetworkPrices_InsertByData({...body, building_id})
//                     }),
//                     v => setProgress(v ? v : 1)
//                 )
//             )
//
//
//         }).then(r => {
//             setProgress(false);
//             reload()
//         })
//     };
//
//     return <FormControl fullWidth>
//         <Select
//             disabled={progress !== false}
//             label={'Copy Pricing from Building'}
//             keyValue={LBuildingId_Name}
//             value={selected_building_id}
//             setValue={setSelectedId}
//             InputProps={{
//                 endAdornment: <InputAdornment position="end">
//                     {progress !== false ? <Spinner/> : <Button
//                         disabled={!selected_building_id}
//                         variant="contained"
//                         color="primary"
//                         onClick={onClick}>
//                         Copy
//                     </Button>}
//
//                 </InputAdornment>
//             }}
//         />
//         {progress && progress >= 0 ?
//             <span>copying...<LinearProgress variant="determinate" value={progress}/></span> : null}
//         {progress && progress < 0 ?
//             <span>cleansing...<LinearProgress color="secondary" variant="determinate" value={-progress}/></span> : null}
//
//     </FormControl>
// };