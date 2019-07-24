import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

import RegisteredManager from '@material-ui/icons/HowToReg';
import EmptyManager from '@material-ui/icons/PersonAddDisabled';
import InvitedManager from '@material-ui/icons/ContactMail';

import React from "react";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import {DeleteIcon} from "../../icons";
import Fab from "@material-ui/core/Fab/Fab";

export const ManagerListItem = ({
                                    location_ids,
                                    email_invite,
                                    access_type,
                                    profile_id,
                                    id,
                                    selectedId,
                                    onSelect,
                                    onSelectDeleteId,
                                    disabled = false
                                }) =>
    <ListItem
        disabled={disabled}
        button
        onClick={() => onSelect(+id)}
        selected={+selectedId === +id}
    >

        <ListItemIcon>
            {profile_id
                ? access_type !== 'admin' && !location_ids.length ? <EmptyManager/> : <RegisteredManager/>
                : <InvitedManager/>
            }
        </ListItemIcon>
        <ListItemText
            primary={`${email_invite || access_type}`}
            secondary={access_type}
        />
        <ListItemSecondaryAction>
            <Fab disabled={disabled} aria-label="Delete" onClick={()=>onSelectDeleteId(id)}>
                <DeleteIcon/>
            </Fab>
        </ListItemSecondaryAction>

    </ListItem>
;