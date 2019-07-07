import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import reducers from './reducers/combinedReducers';
import { hashHistory } from 'react-router';
import config from './services/configService';
import { Environment } from './common/enums';
import services from './services/serviceHolder';

// include dev tools extension in develompent mode
const isDev = config.ENVIRONMENT !== Environment.PRODUCTION,
    emptyMiddleWare = f => f,
    devToolsExtension = isDev && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__() : emptyMiddleWare;

const middleware = [
    // The thunk middleware handles thunk actions, typically used for batching actions together and provide async
    // functionality such as making server requests, etc. All thunk actions will get access to our collected services
    // via an extra parameter. Thus we can connect them to any service we want.
    thunkMiddleware.withExtraArgument(services),

    // The promise middleware manages actions which return a promise. It will then handle resolve and reject
    promiseMiddleware
];

export const store = createStore(
    reducers,
    undefined,
    compose(
        applyMiddleware(...middleware),
        devToolsExtension
    )
);

export const history = syncHistoryWithStore(hashHistory, store);
