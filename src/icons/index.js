import React from "react";
import Extension from '@material-ui/icons/Extension';
import DomainDisabled from '@material-ui/icons/DomainDisabled';
import Domain from '@material-ui/icons/Domain';
import Delete from '@material-ui/icons/Delete';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';
import Pageview from '@material-ui/icons/Pageview';
import Close from '@material-ui/icons/Close';
import Save from '@material-ui/icons/Check';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import LocationOn from '@material-ui/icons/LocationOn';
import LocationCity from '@material-ui/icons/LocationCity';
import People from '@material-ui/icons/People';
import VpnKey from '@material-ui/icons/VpnKey';
import CreditCard from '@material-ui/icons/CreditCard';
import MoreVert from '@material-ui/icons/MoreVert';
import Mail from '@material-ui/icons/Mail';
import Book from '@material-ui/icons/Book';
import WifiOff from '@material-ui/icons/WifiOff';
import Wifi from '@material-ui/icons/Wifi';

export const LocationIcon = LocationOn;

export const AddOnIcon = Extension;
export const RegularIcon = DomainDisabled;
export const CustomModelIcon = Domain;
export const DeleteIcon = Delete;
export const DisableIcon = WifiOff;
export const EnableIcon = Wifi;
export const AddIcon = Add;
export const EditIcon = Edit;
export const PreviewIcon = Pageview;
export const CancelIcon = Close;
export const SaveIcon = Save;
export const GoBack = KeyboardArrowLeft;
export const BuildingIcon = LocationCity;
export const UserIcon = People;
export const AccessIcon = VpnKey;
export const CreditCardIcon = CreditCard;
export const MoreVertIcon = MoreVert;
export const MailIcon = Mail;
export const BookIcon = Book;


export const Spinner = () => <CircularProgress size={20}/>;