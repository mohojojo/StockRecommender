export const Environment = Object.freeze({
    DEVELOPMENT: 'development',
    PRODUCTION: 'production'
});

export const Action = Object.freeze({
    // app
    SET_SERVICES_LOADED: 'SET_SERVICES_LOADED',
    SET_LOADING: 'SET_LOADING',
    ERROR: 'ERROR',
    REDIRECT: 'REDIRECT',
    LOGOUT: 'LOGOUT',
    CLEAR: 'CLEAR',
    MESSAGE: 'MESSAGE',

    // fetch
    FETCH_SKIP: 'fetch/SKIP',
    FETCH_FETCHING: 'fetch/FETCHING',
    FETCH_RECEIVE: 'fetch/RECEIVE',
    FETCH_RECEIVE_APPEND: 'fetch/RECEIVE_APPEND',
    FETCH_FAILED: 'fetch/FAILED',
    FETCH_REMOVE: 'fetch/REMOVE',
    FETCH_WAIT: 'fetch/WAIT',
});

export const ErrorCodes = Object.freeze({
    ERROR_GENERAL: 'failed'
});

