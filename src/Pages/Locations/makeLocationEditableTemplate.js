import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Link from "@material-ui/core/Link/Link";

export const GooglePlaceIdHelp = ({google_place_id}) => <span>
    <Link
        target="_blank"
        rel="noreferrer"
        href='https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder'>
        How to get Google place id?
    </Link>
    &nbsp;&nbsp;&nbsp;
    {google_place_id ? <Link
        target="_blank"
        rel="noreferrer"
        href={`https://www.google.com/maps/place/?q=place_id:${google_place_id}`}>
        Open on map
    </Link> : null}

</span>;

export const makeLocationEditableTemplate = () => ([
    {
        field: 'page',
        title: "Location Wordpress Page",
    },
    {
        field: 'name',
        title: "Location Name",
    },
    {
        field: 'address',
        title: "Location Address",
    },
    {
        field: 'tel',
        title: "Location Phone Number",
    },
    {
        field: 'email',
        title: "Location Email",
    },
    {
        field: 'google_place_id',
        title: "Google Place Id",
        Input: ({value, setValue, className, fieldData}) => <React.Fragment><TextField
            label={fieldData.title}
            className={className}
            value={value}
            onChange={e => setValue(e.target.value)}
            margin="normal"
            variant="outlined"
        />
            <GooglePlaceIdHelp google_place_id={value}/>
        </React.Fragment>
    },
]);