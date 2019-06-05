// import List from "@material-ui/core/List";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemText from "@material-ui/core/ListItemText";
// import Avatar from "@material-ui/core/Avatar";
// import FolderIcon from "@material-ui/icons/Folder";
// import AddIcon from "@material-ui/icons/Add";
// import React from "react";
// import {Link} from "react-router-dom";
// import {makeStyles} from "@material-ui/core";
//
// const useStyles = makeStyles({
//     greenAvatar: {
//         backgroundColor: '#eeeeee',
//     },
// });
//
// export const BaseList = ({selectedId, items = [], renderListItemTitle, Icon = FolderIcon, renderListItemTo, ListItemIcon = FolderIcon, renderListItemCreate}) => {
//     const classes = useStyles();
//     return (<List dense={true}>
//             {renderListItemCreate
//                 ? (<ListItem
//                     style={{color: '#393939'}}
//                     to={renderListItemCreate()}
//                     component={Link}
//                     selected={selectedId === 'add'}
//                 >
//                     <ListItemAvatar>
//                         <Avatar className={classes.greenAvatar}>
//                             <AddIcon color={'primary'}/>
//                         </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText primary={'Create new'}/>
//                 </ListItem>)
//                 : null
//             }
//
//             {items.sort((a, b) => {
//                 if (!!a.deleted_at === b.deleted_at) {
//                     return a.id - b.id
//                 } else {
//                     return !!a.deleted_at - !!b.deleted_at
//                 }
//             }).map((item, idx) => (
//                 <ListItem
//                     style={{color: '#393939'}}
//                     key={item.id}
//                     to={renderListItemTo(item.id)}
//                     component={Link}
//                     selected={+selectedId === +item.id}
//                 >
//                     <ListItemAvatar>
//                         <Avatar>
//                             <ListItemIcon/>
//                         </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText style={{textDecoration: item.deleted_at ? 'line-through' : null}}
//                                   primary={renderListItemTitle(item) || 'N/A'}/>
//                 </ListItem>
//             ))}
//         </List>
//     )
// };