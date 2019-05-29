import React from "react";
import ReactDOM from "react-dom";
import {HashRouter, Link, Route} from 'react-router-dom';
import {LocationsPage} from "./Pages/LocationsPage";
import {BuildingsOfLocationPage} from "./Pages/BuildingsOfLocationPage";
import {HomePage} from "./Pages/HomePage";
import {BuildingsPage} from "./Pages/BuildingsPage";
import AppBar from "@material-ui/core/AppBar/AppBar";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import IconButton from "@material-ui/core/IconButton/IconButton";
import LocationIcon from '@material-ui/icons/LocationCity';
import BuildingIcon from '@material-ui/icons/AccountBalance';
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import {RoutingConstants} from "./constants/RoutingConstants";
import {PricingOutOfNetworkPage} from "./Pages/PricingOutOfNetworkPage";
import {PricingInNetworkPage} from "./Pages/PricingInNetworkPage";
import {PricingAddOnPage} from "./Pages/PricingAddOnPage";

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import primaryColor from '@material-ui/core/colors/lightGreen';

const theme = createMuiTheme({
    palette: {
        primary: primaryColor,
        type: 'dark',
    },
});

const App = () => {
    return <ThemeProvider theme={theme}>
     <HashRouter>
        <AppBar position="static">
            <Toolbar>
            <MenuItem  to="/locations" component={Link}>
                <IconButton color="inherit">
                    <LocationIcon />
                </IconButton>
                <p>Locations</p>
            </MenuItem>
            <MenuItem  to="/buildings" component={Link}>
                <IconButton color="inherit">
                    <BuildingIcon />
                </IconButton>
                <p>Buildings</p>
            </MenuItem>
            </Toolbar>
        </AppBar>
        <Route exact path="/" component={HomePage}/>
        <Route exact path={`/${RoutingConstants.locations}`} component={LocationsPage}/>
        <Route exact path={`/${RoutingConstants.locations}/:id`} component={LocationsPage}/>
        <Route exact path={`/${RoutingConstants.locations}/:id/${RoutingConstants.outOfNetworkPricing}`} component={PricingOutOfNetworkPage}/>
        <Route exact path={`/${RoutingConstants.locations}/:id/${RoutingConstants.addonPricing}`} component={PricingAddOnPage}/>
        <Route exact path={`/${RoutingConstants.locations}/:location_id/${RoutingConstants.buildings}`} component={BuildingsOfLocationPage}/>
        <Route exact path={`/${RoutingConstants.buildings}`} component={BuildingsPage}/>
        <Route exact path={`/${RoutingConstants.buildings}/:id`} component={BuildingsPage}/>
        <Route exact path={`/${RoutingConstants.buildings}/:id/${RoutingConstants.inNetworkPricing}`} component={PricingInNetworkPage}/>
    </HashRouter>
    </ThemeProvider>
};


const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);

/*
{({stack, setStack}) => {
            const current = stack.slice(-1)[0];
            const prevStack = stack.slice(0, stack.length - 1);
            const PROPS = NAME_PROPS[current.name];

            if (!PROPS) return null;

            const {ItemComponent, ListComponent, fetchItems, fetchById} = PROPS;
            const listProps = {
                setId: (id) => {
                    return setStack([...prevStack, {name: current.name, id}])
                },
                id: current.id
            };

            return <div>
                <main>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={current.id ? 2 : 8} lg={current.id ? 2 : 8}>
                            <Paper><ListComponent fetchItems={fetchItems} {...listProps}/></Paper>
                        </Grid>
                        {
                            current.id
                                ? <Grid item xs={12} md={8} lg={8}>
                                    <Paper className={classes.root}>
                                        <ItemComponent key={current.name}
                                                       fetchById={fetchById}
                                                       id={current.id}
                                                       stack={stack}
                                                       setStack={setStack}
                                                       setPrev={()=>[...prevStack, {name: current.name, id:null}]}
                                        />
                                    </Paper>
                                </Grid>
                                : null
                        }
                    </Grid>

                </main>
            </div>
        }}
 */
