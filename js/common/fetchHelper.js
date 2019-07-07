import * as combinedReducers from '../reducers/combinedReducers';
import * as errorAction from '../actions/errorActions';
import { Action } from './enums';

// singleton resources without an ID are stored under this key
export const NO_ID = 'no-id';
export const ALL_ID = null;

// fetch metadata is stored under this key to minimize collision with the resource's own properties
export const META_KEY = '_fetchMetaData';

// generic selector to get the fetched result, with metadata
export const getFetchResult = (state, fetchDesc, resourceId) => {
    return combinedReducers.getFetchResult(state, fetchDesc.id, resourceId);
};

// get the fetch metadata of a given fetched property
export const getFetchMeta = (prop) => {
    return prop[META_KEY] || {};
};

// check if data is fetched
export const isFetched = (data) => {
    const metadata = data && getFetchMeta(data);
    return (metadata && metadata.isFetched) || false;
};

export const isFetchedOrError = (data) => {
    const metadata = data && getFetchMeta(data);
    return (metadata && (metadata.isFetched || metadata.isError)) || false;
};

// check if fetching has started
export const hasStarted = (data) => {
    const metadata = data && getFetchMeta(data);
    return (metadata && (metadata.isFetched || metadata.isFetching)) || false;
};

// action to signal skipped fetches (when a resource is already fetched/fetching)
export const skipAction = (fetchId, resourceId, hasAfterAction, isInfinite) => {
    return { type: Action.FETCH_SKIP, fetchId, resourceId, hasAfterAction, isInfinite };
};

// action to signal that a fetch is in progress
export const fetchingAction = (fetchId, resourceId, hasAfterAction, isInfinite) => {
    return { type: Action.FETCH_FETCHING, fetchId, resourceId, hasAfterAction, isInfinite };
};

// action to handle successful fetches
export const receiveAction = (fetchId, resourceId, data, expire, hasAfterAction, isInfinite) => {
    return { type: Action.FETCH_RECEIVE, fetchId, resourceId, data, expire, hasAfterAction, isInfinite };
};

// action to handle successful fetches with append
export const appendAction = (fetchId, resourceId, data, expire, hasAfterAction, isInfinite) => {
    return { type: Action.FETCH_RECEIVE_APPEND, fetchId, resourceId, data, expire, hasAfterAction, isInfinite };
};

// action to handle failed fetches
export const failedAction = (fetchId, resourceId, error, hasAfterAction) => {
    return { type: Action.FETCH_FAILED, fetchId, resourceId, error, hasAfterAction };
};

// action to remove a previous fetch result
export const removeAction = (fetchId, resourceId = NO_ID) => {
    return { type: Action.FETCH_REMOVE, fetchId, resourceId };
};

// action to signal that a wait is in progress
export const waitAction = (fetchId, resourceId, hasAfterAction, isInfinite) => {
    return { type: Action.FETCH_WAIT, fetchId, resourceId, hasAfterAction, isInfinite };
};

export const redirectAction = (path, message) => {
    return { type: Action.REDIRECT, path, message };
};

export const showMessage = (message) => {
    return { type: Action.MESSAGE, message };
};

// action to do the fetch
export const fetchAction = ({ fetchDesc, resourceId, fetchPromiseCreator, hasAfterAction, isInfinite, message }) => {
    // return a thunk action
    return (dispatch, getState) => {
        if (!fetchPromiseCreator) {
            throw new Error('fetchAction called without fetchPromiseCreator');
        }

        const fetchId = fetchDesc.id;
        // deafult "id"
        resourceId = resourceId || NO_ID;
        // get metadata
        const prop = getFetchResult(getState(), fetchDesc, resourceId),
            propMeta = getFetchMeta(prop);
        if (propMeta.isFetching) {
            dispatch(skipAction(fetchId, resourceId, hasAfterAction, isInfinite));
            return Promise.resolve();
        }
        // instant "fetching" action
        dispatch(fetchingAction(fetchId, resourceId, hasAfterAction, isInfinite));
        // wait for the fetch promise
        const fetchPromise = fetchPromiseCreator();
        if (!fetchPromise) {
            throw new Error('fetchPromiseCreator needs to return a Promise');
        }
        return fetchPromise
            .then(result => {
                if (isInfinite) {
                    dispatch(appendAction(fetchId, resourceId, result, null, hasAfterAction, isInfinite));
                } else {
                    dispatch(receiveAction(fetchId, resourceId, result, null, hasAfterAction, isInfinite));
                    if (message) {
                        dispatch(showMessage(message));
                    }
                }
            })
            .catch(err => {
                console.warn('Fetch error:', fetchId, err);
                let errorMessage;
                try {
                    errorMessage = JSON.parse(err.message);
                } catch (e) {
                    errorMessage = err;
                }

                if (errorMessage.AuthError) {
                    dispatch(redirectAction('login', errorMessage.Message));
                } else if (errorMessage.status === 901) {
                    dispatch(redirectAction('license', errorMessage.Message));
                } else {
                    dispatch(failedAction(fetchId, resourceId, errorMessage, hasAfterAction, isInfinite));
                    dispatch(errorAction.errorSendAction(false, errorMessage));
                }
            });
    };
};

// makes mock fetched object with the provided props
export const mockFetchedObject = (props = {}) => {
    const { value, meta = { isFetched: true } } = props;

    return {
        [META_KEY]: meta,
        ...value
    };
};

// makes mock fetch state with the provided props
export const mockFetchState = (props) => {
    const state = {};
    if (!Array.isArray(props)) {
        props = [props];
    }
    props.forEach(prop => {
        const { fetchDesc, resourceId, value, meta } = prop;
        state[fetchDesc.id] = {
            [resourceId || NO_ID]: mockFetchedObject({ value, meta })
        };
    });
    return state;
};
