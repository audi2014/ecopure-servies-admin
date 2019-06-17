import React, {useState, useEffect} from 'react';
import {BaseItem} from "./BaseItem";
import {makeEditableData} from "./tools";

export const BaseItemCreationPage = ({insertByData, renderTitle, editableTemplate = null}) => {
    const editableData = makeEditableData({}, editableTemplate);
    return <BaseItem
        editableData={editableData}
        editableTemplate={editableTemplate}
        title={renderTitle ? renderTitle(editableData) : 'Add Item'}
        onSave={(editableData) => insertByData({...editableData}).catch(e => alert(e))}
        isAdd={true}
    />;
};


