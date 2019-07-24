import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import {LocationIcon, Spinner} from "../../icons";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import React from "react";

export const LocationListItem = ({name, address, id, onSelect, checked, pending}) =>
    <ListItem
        button
    >
        <ListItemIcon>
            <LocationIcon/>
        </ListItemIcon>
        <ListItemText
            primary={name}
            secondary={address}
        />
        <ListItemSecondaryAction>
            {pending
                ? <Spinner/>
                : <Checkbox
                    color="primary"
                    edge="end"
                    onChange={() => onSelect(id)}
                    checked={checked}
                />
            }
        </ListItemSecondaryAction>
    </ListItem>
;