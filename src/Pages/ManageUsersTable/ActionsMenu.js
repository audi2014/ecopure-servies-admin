import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import {BookIcon, EditIcon, MailIcon, MoreVertIcon} from "../../icons";

export const ActionsMenu = ({id, onEdit, onSendPassword, onBook}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
        return false;
    }


    return (
        <div>
            <IconButton
                aria-label="actions"
                aria-controls="actions-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="actions-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleClose() || onEdit(id)}>
                    <ListItemIcon>
                        <EditIcon/>
                    </ListItemIcon>
                    View/Edit
                </MenuItem>
                <MenuItem onClick={() => handleClose() || onBook(id)}>
                    <ListItemIcon>
                        <BookIcon/>
                    </ListItemIcon>
                    Book
                </MenuItem>
                <MenuItem onClick={() => handleClose() || onSendPassword(id)}>
                    <ListItemIcon>
                        <MailIcon/>
                    </ListItemIcon>
                    Send Reset Password
                </MenuItem>
            </Menu>
        </div>
    );
};