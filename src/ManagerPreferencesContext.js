import React from "react";
import {makeUsingLoadingById} from "./Pages/tools";
import {manager_GetById, manager_UpdateById} from "./api/Api";
import {ModelNameOrDefault} from "./Base/tools";

export const ManagerPreferencesContext = React.createContext({});
const use_load_manager_GetById = makeUsingLoadingById(manager_GetById);

const defaultPreferences = {
    addOnsPricingModelName: ModelNameOrDefault('', "Add-On's"),
    regularPricingModelName: ModelNameOrDefault('', 1),
};
export const wrapManagerPreferencesProvider = Component => props => {
    const manager_id = 1;
    const [manager, reloadManager, setManager] = use_load_manager_GetById(manager_id);
    const preferences = {...defaultPreferences, ...(manager ? manager.preferences : {})};
    const updatePreferences = preferences => {
        return manager_UpdateById(manager_id, {preferences: JSON.stringify(preferences)}).then(r => {
            setManager(r);
            return r;
        });
    };
    return <ManagerPreferencesContext.Provider value={{
        preferences,
        updatePreferences,
    }}>
        <Component {...props}/>
    </ManagerPreferencesContext.Provider>
};