import React from "react";
import Extension from '@material-ui/icons/Extension';
import DomainDisabled from '@material-ui/icons/DomainDisabled';
import Domain from '@material-ui/icons/Domain';
import Delete from '@material-ui/icons/Delete';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import Save from '@material-ui/icons/Check';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';


export const AddOnIcon = Extension;
export const RegularIcon = DomainDisabled;
export const CustomModelIcon = Domain;
export const DeleteIcon = Delete;
export const AddIcon = Add;
export const EditIcon = Edit;
export const CancelIcon = Close;
export const SaveIcon = Save;
export const GoBack = KeyboardArrowLeft;



export const Spinner = () => <CircularProgress size={20}  />;