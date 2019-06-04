import React from 'react';
import {BaseList} from "../../Base/BaseList";
import {BaseItem} from "../../Base/BaseItem";
import {Navigation} from "./Navigation";

export const BuildingsList = (props) => {
    return <BaseList {...props}/>;
};



export const BuildingsItem = (props) => {
    return <BaseItem {...props}>
        {(item, itemProps) => <Navigation selectedId={props.selectedId}/>}

    </BaseItem>
};