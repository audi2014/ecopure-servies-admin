import React from "react";
import Home from '@material-ui/icons/Home';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import Extension from '@material-ui/icons/Extension';
import DomainDisabled from '@material-ui/icons/DomainDisabled';
import Domain from '@material-ui/icons/Domain';
import LocationCity from '@material-ui/icons/LocationCity';
import Delete from '@material-ui/icons/Delete';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Save from '@material-ui/icons/Check';

export const BuildingIcon = Home;
export const LocationIcon = LocationCity;
export const PriceIcon = MonetizationOn;
export const AddOnIcon = Extension;
export const RegularIcon = DomainDisabled;
export const CustomModelIcon = Domain;
export const DeleteIcon = Delete;
export const AddIcon = Add;
export const EditIcon = Edit;
export const CancelIcon = Close;
export const SaveIcon = Save;



export const Spinner = () => <CircularProgress size={20}  />;