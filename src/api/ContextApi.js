import {makeWrapperOfApiProvider} from "./core/ReactApi";
import {_get} from "./core/coreApi";
import {_delete} from "./core/coreApi";
import {_put} from "./core/coreApi";
import {_post} from "./core/coreApi";
import {ErrorContext, WithModalError} from "./core/ModalError";

const Domain_Requests = {
    locations: {
        locations_GetAll: () => _get(`/locations?is_deleted=null`),
        locations_GetById: (id) => _get(`/locations/${id}`),
        locations_UpdateById: (id, data) => _put(`/locations/${id}`, data),
        locations_InsertByData: (data) => _post(`/locations`, data),
    },
    locationsZipcode: {
        locationsZipcode_GetByLocationId: (location_id) => _get(`/locations-zipcode?location_id=${location_id}`),
        locationsZipcode_DeleteById: (id) => _delete(`/locations-zipcode/${id}`),
        locationsZipcode_InsertByData: (data) => _post(`/locations-zipcode`, data),
    },
    buildings: {
        buildingsLarge_GetAll: () => _get(`/buildings-large?is_null_custom_pricing_model_id=null`),
        buildingsLarge_GetById: (id) => _get(`/buildings-large/${id}`),
        buildingsLarge_GetByLocationId: (location_id) => _get(`/buildings-large?location_id=${location_id}&is_deleted=null&is_null_custom_pricing_model_id=null`),
        buildings_UpdateById: (id, data) => _put(`/buildings/${id}`, data),
        buildings_InsertByData: (data) => _post(`/buildings`, data),
    },
    outOfNetworkFootage: {
        outOfNetworkFootage_GetByLocationId: (location_id) => _get('/pricing/out-of-network/footage?location_id=' + location_id),
        outOfNetworkFootage_InsertByData: (data) => _post('/pricing/out-of-network/footage', data),
    },
    outOfNetworkStairs: {
        outOfNetworkStairs_GetByLocationId: (location_id) => _get('/pricing/out-of-network/stairs?location_id=' + location_id),
        outOfNetworkStairs_InsertByData: (data) => _post('/pricing/out-of-network/stairs', data),
    },
    inNetworkExtraFootage: {
        inNetworkExtraFootage_GetByLocationId: (location_id) => _get('/pricing/in-network-extra-footage?location_id=' + location_id),
        inNetworkExtraFootage_InsertByData: (data) => _post('/pricing/in-network-extra-footage', data),
        inNetworkExtraFootage_UpdateById: (id, data) => _put('/pricing/in-network-extra-footage/' + id, data),
        inNetworkExtraFootage_DeleteById: (id) => _delete('/pricing/in-network-extra-footage/' + id),
    },
    addOn: {
        addOn_GetByLocationId: (location_id) => _get('/pricing/add-on?location_id=' + location_id),
        addOn_InsertByData: (data) => _post('/pricing/add-on', data),
    },
    inNetworkPrices: {
        inNetworkPrices_GetByModelId: (id) => _get(`/pricing/in-network-prices?custom_pricing_model_id=${id}&is_deleted=null`),
        inNetworkPrices_InsertByData: (data) => _post('/pricing/in-network-prices', data),
        inNetworkPrices_DeleteById: (id) => _delete('/pricing/in-network-prices/' + id),
    },
    inNetworkModel: {
        inNetworkModel_GetByLocationId: (location_id) => _get(`/pricing/in-network-model?location_id=${location_id}&is_deleted=null`),
        inNetworkModel_GetAll: (id) => _get(`/pricing/in-network-model?is_deleted=null`),
        inNetworkModel_GetById: (id) => _get(`/pricing/in-network-model/${id}`),
        inNetworkModel_DeleteById: (id) => _delete(`/pricing/in-network-model/${id}`),
        inNetworkModel_UpdateById: (id, data) => _put(`/pricing/in-network-model/${id}`, data),
        inNetworkModel_InsertByData: (data) => _post(`/pricing/in-network-model`, data),
    },
    manager: {
        manager_Get: () => _get(`/manager/${1}`),
        manager_Update: (data = {}) => _put(`/manager/${1}`, data),
    },
};

const Domain_ContextWrapper = {};
const Domain_Context = {error: ErrorContext};

Object.keys(Domain_Requests).forEach(key => {
    const [ctx, hoc] = makeWrapperOfApiProvider(Domain_Requests[key]);
    Domain_ContextWrapper[key] = hoc;
    Domain_Context[key] = ctx;
});

export const wrapApiApplication = Component => {
    Object.keys(Domain_ContextWrapper).forEach(key => {
        Component = Domain_ContextWrapper[key](Component);
    });
    Component = WithModalError(Component);
    return Component;
};
export const apiContexts = Domain_Context;

