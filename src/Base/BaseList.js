import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import React from "react";
import {Link} from "react-router-dom";


export const BaseList = ({selectedId, items = [], renderListItemTitle, Icon = FolderIcon, renderListItemTo,ListItemIcon=FolderIcon}) => (
    <List dense={true}>
        {items.sort((a, b) => a.id - b.id).map((item, idx) => (
            <ListItem

                style={{color:'#cccccc'}}
                key={idx}
                to={renderListItemTo(item.id)}
                component={Link}
                selected={+selectedId === +item.id}
            >
                <ListItemAvatar>
                    <Avatar>
                        <ListItemIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={renderListItemTitle(item) || 'N/A'}/>
            </ListItem>
        ))}
    </List>
);