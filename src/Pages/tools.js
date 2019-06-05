import React from "react";

export const mapColumnsKeyValueProp = propName => field_value => (object = {}) => {
    Object.keys(field_value).forEach(key => {
        if (!object[key]) object[key] = {};
        object[key][propName] = field_value[key];
    });
    return object;
};
export const mapColumnsKeyValueDeletedThrough = (object = {}) => {
    Object.keys(object).forEach(key => {
        const prevRender = object[key].render;
        object[key].render = rowData => {
            let content = null;
            if (rowData && typeof rowData === 'object') {
                content = prevRender ? prevRender(rowData) : rowData[key]
            } else {
                content = rowData;
            }
            return <span style={{textDecoration: rowData.deleted_at ? 'line-through' : null}}>{content}</span>
        }
    });
    return object;
};


export const buildColumnsFrom = arrayOfFn => {
    const object = arrayOfFn.reduce((obj, fn) => {
        return fn(obj)
    }, {});

    return Object.keys(object).reduce((prev, field) => {
        prev.push({...object[field], field});
        return prev;
    }, []);
};

export const getBuildingNameByLocationsArray = (b, la, title = 'Building') => {
    const sl = (la || []).find(l => +l.id === +b.location_id);
    return sl
        ? `${title} "${b.name}" of "${sl.name || '#' + sl.id}"`
        : `${title} "${b.name}"`
};

export const getBuildingsTableNameByLocation = (location, title = 'Buildings') => {
    if (!location) location = {};
    return `${title} of "${location.name || '#' + location.id}"`
};

export const makeUsingLoadingById = fetchByIdPromise => (id = null) => {
    const [state, setState] = React.useState(null);

    async function reload() {
        const result = await fetchByIdPromise(id);
        if (result) {
            setState(result);
        } else {
            setState(false);
        }
    }

    React.useEffect(() => {
        reload();
    }, [id]);

    return [state, setState, reload];
};


