import React from "react";
import {apiContexts} from "../api/ContextApi";
import {AuthController} from "../Auth/AuthController";

export const useLocations_GetByAccess = () => {
    const locations_ctx = React.useContext(apiContexts.locations);
    const locations_controller = AuthController.haveAdminAccess()
        ? locations_ctx.locations_GetAll
        : locations_ctx.locations_GetByIds;
    const state_locations = locations_controller.state || [];
    const getAll_request = AuthController.haveAdminAccess()
        ? () => locations_controller.request()
        : () => locations_controller.request(AuthController.getLocationAccessIds());
    return [state_locations, getAll_request, locations_controller.pending];
};

export const useBuildings_GetByAccess = () => {
    const ctx = React.useContext(apiContexts.buildings);
    const controller = AuthController.haveAdminAccess()
        ? ctx.buildingsLarge_GetAll
        : ctx.buildingsLarge_GetByLocationIds;
    const state = controller.state || [];
    const request = AuthController.haveAdminAccess()
        ? () => controller.request()
        : () => controller.request(AuthController.getLocationAccessIds());
    return [state, request, controller.pending];
};