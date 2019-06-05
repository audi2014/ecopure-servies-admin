import React from "react";
import Home from '@material-ui/icons/Home';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Extension from '@material-ui/icons/Extension';
import LocationCity from '@material-ui/icons/LocationCity';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";

export const BuildingIcon = Home;
export const LocationIcon = LocationCity;
export const PriceIcon = MonetizationOn;
export const AddOnIcon = Extension;


export const Spinner = () => <CircularProgress size={20}  />;