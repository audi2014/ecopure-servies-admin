import IconButton from "@material-ui/core/IconButton/IconButton";
import {AccountCircle} from "@material-ui/icons";
import React from "react";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {useAuthEffect} from "./AuthController";

export const ProfileNavButton = () => {
    const auth = useAuthEffect();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    function handleClose() {
        setAnchorEl(null);
    }

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleLogout(event) {
        auth.clearSession();
        handleClose();
        window.location.reload();
    }

    return auth.isRequireRelogin()
        ? null
        : (<React.Fragment>
            <IconButton
                aria-label="Account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
            >
                <AccountCircle/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                {auth.getEmail() ? <MenuItem disabled>{auth.getEmail()}</MenuItem> : null}
                <MenuItem disabled>{auth.haveAdminAccess() ? 'Administrator' : 'Manager'}</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
            </Menu>
        </React.Fragment>)
};