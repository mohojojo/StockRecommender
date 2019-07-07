import { Action } from '../common/enums';
import * as fetchHelper from '../common/fetchHelper';
import { FetchDesc } from '../common/fetchDesc';
import services from '../services/serviceHolder';

// sets the loaded flag for the services
export const setServicesLoaded = () => {
    return {
        type: Action.SET_SERVICES_LOADED
    };
};

export const setLoading = (isLoading) => {
    return {
        type: Action.SET_LOADING,
        isLoading
    };
};

export const clear = () => {
    return {
        type: Action.CLEAR,
    };
};

