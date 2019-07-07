/* eslint-disable complexity */
import { Action } from '../common/enums';

const initialState = {
    loaded: {
        services: false
    },
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.SET_SERVICES_LOADED:
            return {
                ...state,
                loaded: {
                    ...state.loaded,
                    services: true
                }
            };

        case Action.SET_LOADING:
            return {
                ...state,
                loaded: {
                    ...state.loaded,
                    isLoading: action.isLoading
                }
            };

        case Action.MESSAGE:
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
};

export default appReducer;
