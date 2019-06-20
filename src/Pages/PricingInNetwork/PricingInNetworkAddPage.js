import React from "react";
import {RoutingConstants} from "../../constants/RoutingConstants";
import {EditModelView} from "../../Base/EditModelName";
import {ButtonGoToPricingModelsTable} from "../../Base/Buttons";
import {ModelNameOrDefault} from "../../Base/tools";
import {apiContexts} from "../../api/ContextApi";


export const PricingInNetworkAddPage = ({match, history}) => {
    const location_id = match.params.location_id;
    const {inNetworkModel_InsertByData} = React.useContext(apiContexts.inNetworkModel);
    const [name, setName] = React.useState(ModelNameOrDefault(''));
    const [isLoading, setLoading] = React.useState(false);
    const handleCancelClick = () => history.push(`/${RoutingConstants.locations}/${location_id}/${RoutingConstants.editPricingOfLocation}`);
    const handleInsertClick = () => {
        setLoading(true);
        inNetworkModel_InsertByData.request({name, location_id})
            .then(r => {
                if (r && r.id) {
                    history.push(
                        `/${RoutingConstants.locations}/${location_id}/${RoutingConstants.inNetworkPricing}/${r.id}/edit`
                    );
                } else {
                    setLoading(false);
                }
            })
    };

    if (!location_id) return 'empty param `location_id` in route';
    return <div>
        <ButtonGoToPricingModelsTable location_id={location_id}/>
        <EditModelView
            onSave={handleInsertClick}
            onCancel={handleCancelClick}
            isLoading={isLoading}
            setName={setName}
            name={name}
        />
    </div>;
};