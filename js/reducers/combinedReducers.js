import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import fetchReducer, * as fromFetchReducer from './fetchReducer';
import appReducer from './appReducer';

const combinedReducers = combineReducers({
    fetch: fetchReducer,
    form: reduxFormReducer,
    app: appReducer,
    routing: routerReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'CLEAR') {
        state = undefined;
    }

    return combinedReducers(state, action);
};

// root
export default rootReducer;

// fetch
export function getFetchResult(state, fetchId, resourceId) {
    return fromFetchReducer.getFetchResult(state.fetch, fetchId, resourceId);
}
