import {ProfileSelect, ProfileText} from "./components";
import {RESOURCES} from "./constants";
import {Stairs_Title} from "../../constants/Enum";

export const columnsProfile = [
    {Component: ProfileText, title: 'Email', field: 'email', type: 'email', required: true,},
    {Component: ProfileText, title: 'First Name', field: 'first_name', required: true,},
    {Component: ProfileText, title: 'Last Name', field: 'last_name', required: true,},
    {Component: ProfileText, title: 'Phone', field: 'phone', required: true,},
    {Component: ProfileSelect, title: 'How did you find EcoPure?', field: 'resource', keyValue: RESOURCES},

];

export const columnsAddress = [
    {Component: ProfileSelect, title: 'Building', field: 'building_id',},
    {Component: ProfileText, title: 'Building Name', field: 'building_name',},
    {Component: ProfileText, title: 'Street Address', field: 'address',},
    {Component: ProfileText, title: 'Apartment Number', field: 'apt_num',},
    {Component: ProfileSelect, title: 'Zip Code', field: 'zip_code',},
    {Component: ProfileSelect, title: 'How many stairs in climb?', field: 'flight_stairs', keyValue: Stairs_Title},
];