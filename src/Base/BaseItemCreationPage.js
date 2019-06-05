import React, {useState, useEffect} from 'react';
import {BaseItem} from "./BaseItem";

const BaseItemCreationPage = ({insertByData, creationTemplate, title}) => {
    const {id, deleted_at, created_at, updated_at, location_id, building_id, ...editableData} = creationTemplate;
    return <BaseItem
        ditableData={editableData}
        title={title}
        onSave={(editableData) => insertByData({...creationTemplate, ...editableData})}
        isAdd={true}
    />;
};


