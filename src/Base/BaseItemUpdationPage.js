import React, {useState, useEffect} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import {Spinner} from "../icons";
import {BaseItem} from "./BaseItem";

export const BaseItemUpdationPage = ({title, fetchById, updateById, selectedId, children, ...rest}) => {
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

    const {id, deleted_at, created_at, updated_at, location_id, building_id, ...editableData} = item;
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
        key={item.id}
        editableData={editableData}
        title={title}
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


