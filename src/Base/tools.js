export const makeEditableData = (item, editableTemplate) => {
    if (editableTemplate) {
        return editableTemplate.reduce((prev, curr) => {
            prev[curr.field] = item[curr.field] || curr.defaultValue || '';
            return prev;
        }, {});

    } else {
        const {id, deleted_at, created_at, updated_at, location_id, building_id, ...rest} = item;
        return rest;
    }
};