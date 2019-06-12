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

export function PromiseAllWithProgress(proms, progress_cb) {
    let d = 0;
    progress_cb(0);
    for (const p of proms) {
        p.then(()=> {
            d ++;
            progress_cb( (d * 100) / proms.length );
        });
    }
    return Promise.all(proms);
}
