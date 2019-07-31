import {MUInputSelect, MUInputText} from "./components";
import {RESOURCES} from "./constants";
import {Stairs_Title} from "../../constants/Enum";

export const columnsProfile = [
    {Component: MUInputText, title: 'Email', field: 'email', type: 'email', required: true,},
    {Component: MUInputText, title: 'First Name', field: 'first_name', required: true,},
    {Component: MUInputText, title: 'Last Name', field: 'last_name', required: true,},
    {Component: MUInputText, title: 'Phone', field: 'phone', required: true,},
    {Component: MUInputSelect, title: 'How did you find EcoPure?', field: 'resource', keyValue: RESOURCES},

];

export const columnsAddress = [
    {Component: MUInputSelect, title: 'Location', field: 'location_id',},
    {Component: MUInputSelect, title: 'Zip Code', field: 'zip_code',},
    {Component: MUInputSelect, title: 'Building', field: 'building_id',},
    {Component: MUInputText, title: 'Building Name', field: 'building_name',},
    {Component: MUInputText, title: 'Street Address', field: 'address',},
    {Component: MUInputText, title: 'Apartment Number', field: 'apt_num',},
    {Component: MUInputSelect, title: 'How many stairs in climb?', field: 'flight_stairs', keyValue: Stairs_Title},
];