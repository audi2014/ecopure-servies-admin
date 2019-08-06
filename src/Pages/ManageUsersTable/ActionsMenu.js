import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import {BookIcon, EditIcon, MailIcon, MoreVertIcon} from "../../icons";

const ITEM_HEIGHT = 48;


/*
{
    icon: 'mail',
    tooltip: 'Send Reset Password',
    onClick: (event, {id}) => {
        if (id && !users_SendSetUpPasswordById.pending) {
            users_SendSetUpPasswordById.request(id)
        }
    }
},
{
    icon: 'edit',
    tooltip: 'View/Edit',
    onClick: (event, rowData) => {
        history.push(`/${RoutingConstants.manageUsers}/${rowData.id}/edit`)
    }
},
{
    icon: 'book',
    tooltip: 'Book',
    onClick: (event, rowData) => {
        history.push(`/${RoutingConstants.manageUsers}/${rowData.id}/book`)
    }
},
* */
export const ActionsMenu = ({id, onEdit, onSendPassword, onBook}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
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
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                    },
                }}
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