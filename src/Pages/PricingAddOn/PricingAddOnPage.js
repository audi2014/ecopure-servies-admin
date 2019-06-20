import React from "react";
import {Spinner} from "../../icons";
import {ExtraFootageTable} from "./ExtraFootageTable";
import {AddOnTable} from "./AddOnTable";
import {ButtonGoToPricingModelsTable} from "../../Base/Buttons";
import {makeEditPreferencesProp} from "../../Base/EditModelName";
import {apiContexts} from "../../api/ContextApi";

const handleSave = (location_id, setEdition, insert, reload,) => data => {
    setEdition({...data, loading: true});
    return insert(data)
        .then(r => reload(location_id))
        .then(r => {
            setEdition({});
            return r;
        })
};

const EditName = makeEditPreferencesProp('addOnsPricingModelName');

export const PricingAddOnPage = ({match, history,}) => {
    const location_id = +match.params.id;

    const [edition, setEdition] = React.useState({});

    const {addOn_GetByLocationId, addOn_InsertByData} = React.useContext(apiContexts.addOn);
    const {locations_GetById} = React.useContext(apiContexts.locations);

    const addons = addOn_GetByLocationId.state;
    const location = locations_GetById.state;

    React.useEffect(() => {
        addOn_GetByLocationId.request(location_id);
        locations_GetById.request(location_id);
    }, [location_id]);


    if (addons === false || location === false) return 'error.';
    if (!addons || !location) return <Spinner/>;

    return <div>
        <ButtonGoToPricingModelsTable location_id={location_id}/>
        <EditName/>
        <AddOnTable
            edition={edition}
            setEdition={setEdition}
            onSave={handleSave(
                location_id,
                setEdition,
                addOn_InsertByData.request,
                addOn_GetByLocationId.request,
            )}
            location_id={location_id}
            addons={addons}
        />
        <ExtraFootageTable location_id={location_id}/>

    </div>;
};

