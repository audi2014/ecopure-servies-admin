import {makeWrapperOfApiProvider} from "./core/ReactApi";
import {_auth, _get, _legacyApiRequest, _manageUsersApiRequest} from "./core/coreApi";
import {_delete} from "./core/coreApi";
import {_put} from "./core/coreApi";
import {_post} from "./core/coreApi";
import {ErrorContext, WithModalError} from "./core/ModalError";
import {AuthController} from "../Auth/AuthController";

const users_RequireTokenById = (id) =>
    _manageUsersApiRequest('require_token_by_id', {id});

const users_SendSetUpPasswordById = id =>
    _manageUsersApiRequest('send_setup_password', {id});

const users_deactivateInZipCodes = (zip_codes) => _manageUsersApiRequest('deactivate_users_in_zip_codes', {zip_codes});
const users_activateInZipCodes = (zip_codes) => _manageUsersApiRequest('activate_users_in_zip_codes', {zip_codes});


const Domain_Requests = {
    locations: {
        locations_GetAll: () => _get(`/locations?is_deleted=null`),
        locations_GetByIds: (ids = []) => {
            if (!ids.length) return new Promise(resolve => resolve([]));
            return _get(`/locations?is_deleted=null&ids=${ids.join(',')}`);
        },
        locations_GetById: (id) => _get(`/locations/${id}`),
        locations_UpdateById: (id, data) => _put(`/locations/${id}`, data),
        locations_InsertByData: (data) => _post(`/locations`, data),
        locations_DeleteForeverById: (id) => _delete(`/locations/${id}`),
    },
    locationsZipcode: {
        locationsZipCode_GetAll: () => _get(`/locations-zipcode`),
        locationsZipCode_GetByLocationIds: (ids) => _get(`/locations-zipcode?location_ids=${ids.join(',')}`),
        locationsZipcode_GetByLocationId: (location_id) => _get(`/locations-zipcode?location_id=${location_id}`),
        locationsZipcode_DeleteById: (id) => _delete(`/locations-zipcode/${id}`),
        locationsZipcode_InsertByData: (data) => _post(`/locations-zipcode`, data),
    },
    buildings: {
        buildingsLarge_GetAll: () => _get(`/buildings-large?is_null_custom_pricing_model_id=null&is_deleted=null`),
        buildingsLarge_GetByLocationIds: (ids = []) => {
            if (!ids.length) return new Promise(resolve => resolve([]));
            return _get(`/buildings-large?is_null_custom_pricing_model_id=null&is_deleted=null&location_ids=${ids.join(',')}`)
        },
        buildingsLarge_GetById: (id) => _get(`/buildings-large/${id}`),
        buildingsLarge_GetByLocationId: (location_id) => _get(`/buildings-large?location_id=${location_id}&is_deleted=null&is_null_custom_pricing_model_id=null`),
        buildings_UpdateById: (id, data) => _put(`/buildings/${id}`, data),
        buildings_InsertByData: (data) => _post(`/buildings`, data),
        buildings_DeleteForeverById: (id) => _delete(`/buildings/${id}`),
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


        addOn_GetByZipCode: (zipcode) => _get(`/locations-zipcode?zipcode=${zipcode}`)
            .then(items => {
                return (items && items.length)
                    ? _get('/pricing/add-on?location_id=' + items[0].location_id)
                    : [];
            }),
    },
    inNetworkPrices: {
        inNetworkPrices_GetByModelId: (id) => _get(`/pricing/in-network-prices?custom_pricing_model_id=${id}&is_deleted=null`),
        inNetworkPrices_InsertByData: (data) => _post('/pricing/in-network-prices', data),
        inNetworkPrices_DeleteById: (id) => _delete('/pricing/in-network-prices/' + id),
    },
    inNetworkModel: {
        inNetworkModel_GetByLocationId: (location_id) => _get(`/pricing/in-network-model?location_id=${location_id}&is_deleted=null`),

        //todo access
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
    managerAccess: {
        managerAccess_GetAll: () => _get(`/manager-access`),
        managerAccess_UpdateById: (id, data) => _put(`/manager-access/${id}`, data),
        managerAccess_DeleteById: (id) => _delete(`/manager-access/${id}`),
        managerAccess_InsertAndGrantAccessAndSendInvite: ({access_type = 'manager', location_ids = [], email_invite}) =>
            _post('/manager-access', {access_type, location_ids, email_invite})
    },

    auth: {
        sendResetPassword: ({email}) => _auth(`/auth/send-reset-password`, {
            email,
        }),
        loginWithNewPassword: ({email, password, remember, token}) => _auth(`/auth/login-with-new-password`, {
            email,
            password,
            token,
            ...AuthController.makeSessionConfig(!!remember),
        }),
        login: ({email, password, remember}) => _auth(`/auth/login-or-register`, {
            email,
            password,
            ...AuthController.makeSessionConfig(!!remember),
        }),
        register: ({email, password, remember}) => _auth(`/auth/register`, {
            email,
            password,
            ...AuthController.makeSessionConfig(!!remember),
        }),
    },
    users: {
        users_deactivateInZipCodes,
        users_activateInZipCodes,
        users_editByIdAndData: (id, data) => _manageUsersApiRequest('edit_user', {id, ...data}),
        users_deleteById: (id) => _manageUsersApiRequest('delete_user_by_id', {id}),
        users_deleteByZipCodes: (zip_codes) => _manageUsersApiRequest('delete_user_by_zip_codes', {zip_codes}),
        users_deleteBulk: (ids) => _manageUsersApiRequest('delete_user_bulk', {ids}),
        users_cardGetById: (id) => _manageUsersApiRequest('user_card_get_by_id', {id}),
        users_RequireTokenById,
        users_SendSetUpPasswordById,
        users_GetPage: (data) => _manageUsersApiRequest('query', {
            ...data
        }),
        users_GetFirstById: (id) => _manageUsersApiRequest('query', {
            filters: {id}
        }).then(r => {
            if (r && r.items && r.items[0]) return r.items[0]
            else throw new Error('User not found');
        }),
        users_Register: (data) => _legacyApiRequest('create_user', data)
            .then(registerRes => {
                if (registerRes && registerRes.id) {
                    return users_SendSetUpPasswordById(registerRes.id)
                        .then(() => registerRes)
                } else {
                    console.error('no id in create_user response', registerRes);
                    return registerRes;
                }
            }),
        users_HomeCleaning: (data) => _legacyApiRequest('home_cleaning', data),
        users_checkEmailExist: (data) => _legacyApiRequest('check_email_exist', data),
        users_addBillingInfo: ({email, cc_number, exp_date, cvv, cc_zip,}) =>
            _post(`/crypto-helper/encrypt/card`, {email, cc_number, exp_date, cvv, cc_zip,})
                .then(encryptedCardData => _legacyApiRequest('add_billing_info', {email, ...encryptedCardData}),)


    }


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

