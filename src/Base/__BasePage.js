// import React, {useEffect, useState} from "react";
// import {makeStyles} from "@material-ui/core";
// import Paper from "@material-ui/core/Paper/Paper";
// import Grid from "@material-ui/core/Grid/Grid";
// import {Spinner} from "../icons";
//
// const useStyles = makeStyles(theme => ({
//     root: {
//         padding: theme.spacing(3, 2),
//     },
// }));
//
// export const BasePage = ({
//                              ListComponent,
//                              ItemComponent,
//                              fetchItems,
//                              fetchById,
//                              updateById,
//                              renderListItemTitle,
//                              listItemPath,
//                              renderListItemTo,
//                              selectedId,
//                              itemTitle,
//                              ListItemIcon,
//                              renderListItemCreate,
//                              creationTemplate,
//                              isAdd,
//                              insertByData,
//                              onDidInsert,
//                          }) => {
//
//
//     const classes = useStyles();
//
//     const [items, setItems] = useState(null);
//
//     async function fetchItemsToState() {
//         const result = await fetchItems();
//         if (result) {
//             setItems(result);
//         } else {
//             setItems(false)
//         }
//     }
//
//     useEffect(() => {
//         fetchItemsToState();
//     }, []);
//
//     if (items === null) return <Spinner/>
//     if (items === false) return 'error.'
//
//     const handleInsert = (...props) => insertByData(...props)
//         .then(r => r ? onDidInsert(r) : r)
//         .then(r => fetchItemsToState())
//     return <div>
//         <main>
//             <Grid container spacing={3}>
//                 <Grid item xs={12} md={selectedId ? 2 : 12} lg={selectedId ? 2 : 12}>
//                     <Paper>
//                         <ListComponent
//                             items={items}
//                             renderListItemTitle={renderListItemTitle}
//                             renderListItemTo={renderListItemTo}
//                             selectedId={selectedId}
//                             ListItemIcon={ListItemIcon}
//                             renderListItemCreate={renderListItemCreate}
//                         /></Paper>
//                 </Grid>
//                 {
//                     selectedId
//                         ? <Grid item xs={12} md={8} lg={8}>
//                             <Paper className={classes.root}>
//                                 <ItemComponent
//                                     setListItems={setItems}
//                                     items={items}
//                                     fetchById={fetchById}
//                                     updateById={updateById}
//                                     insertByData={handleInsert}
//                                     isAdd={isAdd}
//                                     selectedId={selectedId}
//                                     itemTitle={itemTitle}
//                                     reloadListItems={fetchItemsToState}
//                                     creationTemplate={creationTemplate}
//                                 />
//                             </Paper>
//                         </Grid>
//                         : null
//                 }
//             </Grid>
//
//         </main>
//     </div>;
// };