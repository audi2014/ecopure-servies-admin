import FormControl from "@material-ui/core/FormControl/FormControl";
import Button from "@material-ui/core/Button/Button";
import {If} from "./If";
import React from "react";

export const predicateHideDeleted = item => !item.deleted_at;
export const useHideDeactivated = (items, itemsTitle) => {
    const [filtered_hide_deleted, set_filtered_hide_deleted] = React.useState(true);
    const items_filtered = items.filter(predicateHideDeleted);
    const renderToggle = () => items.length !== items_filtered.length ?
        <FormControl fullWidth>

            <Button
                variant="contained"
                color="default"
                onClick={() => set_filtered_hide_deleted(!filtered_hide_deleted)}
            >
                <If value={filtered_hide_deleted}>
                <span>
                    Didn’t find what you’re looking for? Some {itemsTitle} may be hidden because they are deactivated. Show full list of {itemsTitle}
                </span>
                    <span>
                    Hide deleted {itemsTitle}
                </span>
                </If>
            </Button>
        </FormControl>
        : null;
    // : <span>{+filtered_hide_deleted} {items.length} {items_filtered.length}</span>;
    return [filtered_hide_deleted ? items_filtered : items, renderToggle];
};