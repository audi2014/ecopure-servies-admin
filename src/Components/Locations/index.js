import React from 'react';

import {BaseList} from "../../Base/BaseList";
import {BaseItem} from "../../Base/BaseItem";
import {Navigation} from "./Navigation";
import {ZipCodes} from "./ZipCodes";
import Link from '@material-ui/core/Link';
import Typography from "@material-ui/core/Typography/Typography";

export const LocationsList = (props) => {
    return <BaseList {...props}/>;
};


export const LocationsItem = (props) => {
    return <BaseItem {...props}>
        {(item, itemProps) => [

            <ZipCodes key={'zip'} location_id={props.selectedId}/>,
            <Typography key='help' style={{margin: 20}} variant="h6">
                <Link href='https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder'>How
                    to get Google place id?</Link>
            </Typography>,
            <Navigation key={'nav'} selectedId={props.selectedId}/>,
        ]}
    </BaseItem>
};
