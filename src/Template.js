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

import LocationIcon from '@material-ui/icons/LocationCity';
import BuildingIcon from '@material-ui/icons/AccountBalance';
import {withTheme} from "./Theme";


import {StylesProvider, createGenerateClassName} from '@material-ui/styles';

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


const Bar = () => {
    const classes = useStyles();
    return <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                Ecopure Dashboard
            </Typography>
            <nav>

                <Link component={RouterLink} to="/locations" variant="button" color="primary"
                      href="#"
                      className={classes.link}>
                    <IconButton color="inherit"><LocationIcon/></IconButton> Locations
                </Link>
                <Link component={RouterLink} to="/buildings" variant="button" color="primary"
                      href="#"
                      className={classes.link}>
                    <IconButton color="inherit"><BuildingIcon/></IconButton> Buildings
                </Link>
            </nav>
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



