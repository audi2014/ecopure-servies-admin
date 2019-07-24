import React from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import {HashRouter, Link as RouterLink} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Typography from "@material-ui/core/Typography/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Container from "@material-ui/core/Container/Container";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {withTheme} from "./Theme";


import {StylesProvider, createGenerateClassName} from '@material-ui/styles';
import {Config} from "./constants/Config";
import {ProfileNavButton} from "./Auth/ProfileNavButton";
import {AccessIcon, BuildingIcon, LocationIcon} from "./icons";
import {ManageAccessLink} from "./Auth/AdminNavLink";
import {RoutingConstants} from "./constants/RoutingConstants";

const generateClassName = createGenerateClassName({
    productionPrefix: 'bar',
    seed: 'bar'
});

const useStyles = makeStyles(theme => {
    return ({
        '@global': {
            body: {
                backgroundColor: theme.palette.common.white,
            },
            ul: {
                margin: 0,
                padding: 0,
            },
            li: {
                listStyle: 'none',
            },
        },
        appBar: {
            borderBottom: `1px solid ${theme.palette.divider}`,
        },
        toolbar: {
            flexWrap: 'wrap',
        },
        toolbarTitle: {
            flexGrow: 1,
        },
        link: {
            color: theme.palette.primary[600],
            margin: theme.spacing(1, 1.5),
        },
    });
});

const Logo = ({className}) => {
    const handleClick = () => alert(Object.keys(Config).map(k => `${k} : ${Config[k]}`).join(" \n"));

    return <React.Fragment>
        <Typography variant="h6" color="inherit" noWrap className={className}>
            Ecopure Dashboard
        </Typography>
        {
            Config.ENVIRONMENT !== 'production'
                ? <span
                    style={{'cursor': 'pointer'}}
                    onClick={handleClick}> {Config.ENVIRONMENT} </span>
                : null
        }

    </React.Fragment>
};

const Bar = () => {
    const classes = useStyles();
    return <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
            <Logo className={classes.toolbarTitle}/>
            <nav>
                <Link component={RouterLink} to={`/${RoutingConstants.locations}`} variant="button" color="primary"
                      href="#"
                      className={classes.link}>
                    <IconButton color="inherit"><LocationIcon/></IconButton> Locations
                </Link>
                <Link component={RouterLink} to={`/${RoutingConstants.buildings}`} variant="button" color="primary"
                      href="#"
                      className={classes.link}>
                    <IconButton color="inherit"><BuildingIcon/></IconButton> Buildings
                </Link>
                <ManageAccessLink
                    component={RouterLink} to={`/${RoutingConstants.manageAccess}`}
                    variant="button"
                    color="primary"
                    href="#"
                    className={classes.link}
                >
                    <IconButton color="inherit"><AccessIcon/></IconButton> Access
                </ManageAccessLink>
            </nav>
            <ProfileNavButton/>
        </Toolbar>
    </AppBar>
};

export const withTemplate = Component => withTheme(props => {
    return <HashRouter>
        <CssBaseline/>
        <StylesProvider generateClassName={generateClassName}>
            <Bar/>
        </StylesProvider>
        <Container maxWidth={false} component="main">
            <Component {...props}/>
        </Container>
    </HashRouter>
});



