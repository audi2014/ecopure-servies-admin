import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import {Spinner} from "../icons";
import {BaseItem} from "./BaseItem";
import {makeEditableData} from "./tools";


export const BaseItemUpdationPage = ({
                                         disabled,
                                         renderTitle,
                                         data,
                                         reload,
                                         onSave,
                                         onDelete,
                                         children,
                                         editableTemplate = null,
                                         ...rest
                                     }) => {

    if (data === null) return <Spinner/>;
    if (data === false) return <Typography style={{margin: 20}} variant="h6">Item not found</Typography>;

    const editableData = makeEditableData(data, editableTemplate);

    const {id, deleted_at, updated_at} = data;

    const isDisabled = !!deleted_at;
    const onToggleDisabled = () => onSave(
        {
            deleted_at: isDisabled ? null : Math.round((new Date()).getTime() / 1000)
        }
    );
    return <BaseItem
        onDelete={onDelete}
        disabled={disabled}
        key={`${id}`}
        editableData={editableData}
        editableTemplate={editableTemplate}
        title={renderTitle ? renderTitle(data || {}) : 'Edit Item'}
        isDisabled={isDisabled}
        onToggleDisabled={onToggleDisabled}
        onSave={onSave}
        isAdd={false}
    />;


};


