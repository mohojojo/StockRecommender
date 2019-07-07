import { Action } from '../common/enums';

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

