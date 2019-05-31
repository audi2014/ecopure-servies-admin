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

import { ThemeProvider } from '@material-ui/styles';
import {Theme} from "./Theme";



const App = () => {
    return <ThemeProvider theme={Theme}>
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
         <Route exact path={`/${RoutingConstants.locations}/:location_id/${RoutingConstants.buildings}/:id`} component={BuildingsOfLocationPage}/>
        <Route exact path={`/${RoutingConstants.buildings}`} component={BuildingsPage}/>
        <Route exact path={`/${RoutingConstants.buildings}/:id`} component={BuildingsPage}/>
        <Route exact path={`/${RoutingConstants.buildings}/:id/${RoutingConstants.inNetworkPricing}`} component={PricingInNetworkPage}/>
    </HashRouter>
    </ThemeProvider>
};


const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);
