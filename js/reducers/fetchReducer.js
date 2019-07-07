/* eslint-disable complexity */
import { Action } from '../common/enums';
import { NO_ID, ALL_ID, META_KEY } from '../common/fetchHelper';

const initialState = {};

function meta({ isFetching = false, isFetched = false, error = null, expire = 0,
    hasAfterAction = false, isWaiting = false }) {
    return {
        isFetching,
        isFetched,
        expire,
        error,
        isError: Boolean(error),
        hasAfterAction,
        isWaiting,
        isUnfetched: !(isFetching || isFetched || error)
    };
}

export default function fetchReducer(state = initialState, action = {}) {
    switch (action.type) {
        case Action.FETCH_FETCHING: {
            let data = {};
            if (action.isInfinite && state[action.fetchId]) {
                data = {
                    ...state[action.fetchId][action.resourceId]
                };

                delete data._fetchMetaData;
            }
            return {
                ...state,
                [action.fetchId]: {
                    ...state[action.fetchId],
                    [action.resourceId]: {
                        [META_KEY]: meta({
                            isFetching: true,
                            hasAfterAction: action.hasAfterAction,
                            isInfinite: action.isInfinite
                        }),
                        ...data
                    }
                }
            };
        }

        case Action.FETCH_RECEIVE: {
            let data = { ...action.data };
            if (Array.isArray(action.data)) {
                data = {
                    data: action.data
                };
            }

            return {
                ...state,
                [action.fetchId]: {
                    ...state[action.fetchId],
                    [action.resourceId]: {
                        [META_KEY]: meta({
                            isFetched: true,
                            expire: action.expire,
                            hasAfterAction: action.hasAfterAction,
                            isInfinite: action.isInfinite
                        }),
                        ...data
                    }
                }
            };
        }

        case Action.FETCH_RECEIVE_APPEND: {
            let hasMore = true;
            if (action.isInfinite && state[action.fetchId]) {
                const currentContent = state[action.fetchId][action.resourceId].Content ?
                    state[action.fetchId][action.resourceId].Content.Results : [];

                hasMore = action.data.Content.Results.length > 0;

                action.data.Content.Results =
                    [...currentContent, ...action.data.Content.Results];
            }

            return {
                ...state,
                [action.fetchId]: {
                    ...state[action.fetchId],
                    [action.resourceId]: {
                        [META_KEY]: meta({
                            isFetched: true,
                            expire: action.expire,
                            hasAfterAction: action.hasAfterAction,
                            isInfinite: action.isInfinite
                        }),
                        hasMore,
                        ...action.data,

                    }
                }
            };
        }

        case Action.FETCH_FAILED:
            return {
                ...state,
                [action.fetchId]: {
                    ...state[action.fetchId],
                    [action.resourceId]: {
                        [META_KEY]: meta({
                            error: action.error,
                            hasAfterAction: action.hasAfterAction,
                            isInfinite: action.isInfinite
                        })
                    }
                }
            };

        case Action.FETCH_WAITING:
            return {
                ...state,
                [action.fetchId]: {
                    ...state[action.fetchId],
                    [action.resourceId]: {
                        [META_KEY]: meta({
                            isWaiting: true,
                            hasAfterAction: action.hasAfterAction,
                            isInfinite: action.isInfinite
                        })
                    }
                }
            };

        case Action.FETCH_REMOVE: {
            if (action.resourceId === ALL_ID) {
                return {
                    ...state,
                    [action.fetchId]: {}
                };
            }

            const newState = {
                ...state,
                [action.fetchId]: {
                    ...state[action.fetchId],
                    [action.resourceId]: null
                }
            };

            return newState;
        }

        default:
            return state;
    }
}


// Selectors

export function getFetchResult(state, fetchId, resourceId = NO_ID) {
    const result = state && state[fetchId] && state[fetchId][resourceId];
    // defaults to "we're not even started to fetch it yet"
    return result || { [META_KEY]: meta({}) };
}
