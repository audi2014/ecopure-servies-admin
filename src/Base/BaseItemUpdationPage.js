import React, {useState, useEffect} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import {Spinner} from "../icons";
import {BaseItem} from "./BaseItem";
import {makeEditableData} from "./tools";


export const BaseItemUpdationPage = ({renderTitle, fetchById, updateById, selectedId, children, editableTemplate = null, ...rest}) => {
    const [item, setItem] = useState(null);

    async function fetchItemToState() {
        const result = await fetchById(selectedId);
        if (result) {
            setItem(result);
        } else {
            setItem(false);
        }
    }

    useEffect(() => {
        fetchItemToState(selectedId);
    }, [selectedId]);

    if (item === null) return <Spinner/>;
    if (item === false) return <Typography style={{margin: 20}} variant="h6">Item not found</Typography>;

    const editableData = makeEditableData(item, editableTemplate);

    const {id, deleted_at,} = item;

    const isDisabled = !!deleted_at;
    const onToggleDisabled = updateById
        ? () => updateById(id, {
            deleted_at: isDisabled ? null : Math.round((new Date()).getTime() / 1000)
        }).then(r => fetchItemToState())
        : null;

    const onSave = updateById
        ? (diff) => updateById(id, diff).then(r => fetchItemToState())
        : null;


    return <BaseItem
        key={id}
        editableData={editableData}
        editableTemplate={editableTemplate}
        title={renderTitle ? renderTitle(item) : 'Edit Item'}
        isDisabled={isDisabled}
        children={children}
        onToggleDisabled={onToggleDisabled}
        onSave={onSave}
        isAdd={false}

    >{
        children(
            item,
            {
                selectedId,
                reload: fetchItemToState,
                item,
                editableData,
            }
        )
    }</BaseItem>;


};


