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
        p.then(() => {
            d++;
            progress_cb((d * 100) / proms.length);
        });
    }
    return Promise.all(proms);
}

export const ModelNameOrDefault = (name = '', ifEmptyAddSuffix = '') => String(name).trim() || (`Untitled Model${ifEmptyAddSuffix ? ' ' + ifEmptyAddSuffix : ''}`);
export const getManagerPreferences = manager => {

    const defaultPreferences = {
        addOnsPricingModelName: ModelNameOrDefault('', "Add-On's"),
        regularPricingModelName: ModelNameOrDefault('', 1),
    };
    if (!manager || !manager.preferences) {
        return defaultPreferences;
    } else return {...defaultPreferences, ...manager.preferences};
};

export const centsToDollars = cents => cents ? (cents / 100).toFixed(2) : 0;
export const dollarsToCents = dollars => Math.round(dollars * 100) || 0;