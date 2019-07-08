/* global describe,it,expect,global */

import * as fetchHelper from '../fetchHelper';
import { FetchDesc } from '../../common/fetchDesc';
import { Action as Actions } from '../enums';
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import utils from '../../common/utils';
import { actionTypesInclude, actionsForType } from '../../common/testUtils';
import config from '../../services/configService';

// mock redux store
const mockStore = configureStore([reduxThunk]);

// contant values
const USER_WITHOUT_ID = 'USER_WITHOUT_ID',
    USER_WITH_ID = 'USER_WITH_ID',
    USER_WITH_ID_META = 'USER_WITH_ID_META';

const defaultState = {
    fetch: {
        user: {
            [fetchHelper.NO_ID]: {
                [fetchHelper.META_KEY]: {
                },
                userId: USER_WITHOUT_ID
            },
            someId: {
                [fetchHelper.META_KEY]: {
                    userId: USER_WITH_ID_META
                },
                userId: USER_WITH_ID
            }
        }
    }
};

function cloneState() {
    return JSON.parse(JSON.stringify(defaultState));
}

global.console.warn = utils.noop;

describe('fetchHelper', () => {

    describe('getFetchResult', () => {
        it('gets the correct state for resources without id', () => {
            const result = fetchHelper.getFetchResult(defaultState, FetchDesc.USER);
            expect(result.userId).toBe(USER_WITHOUT_ID);
        });

        it('gets the correct state for resources with id', () => {
            const result = fetchHelper.getFetchResult(defaultState, FetchDesc.USER, 'someId');
            expect(result.userId).toBe(USER_WITH_ID);
        });
    });

    describe('getFetchMeta', () => {
        it('gets the correct metadata', () => {
            const prop = defaultState.fetch.user.someId,
                meta = fetchHelper.getFetchMeta(prop);
            expect(meta.userId).toBe(USER_WITH_ID_META);
        });
    });

    describe('isFetched', () => {
        it('gets the correct result', () => {
            expect(fetchHelper.isFetched({ [fetchHelper.META_KEY]: { isFetched: true } })).toBe(true);
            expect(fetchHelper.isFetched({ [fetchHelper.META_KEY]: { isFetched: false } })).toBe(false);
            expect(fetchHelper.isFetched({ })).toBe(false);
        });
    });

    describe('skipAction', () => {
        it('puts all params into the action', () => {
            const action = fetchHelper.skipAction('fetch-id', 'res-id', 'afterAction', true);
            expect(action).toEqual({
                type: Actions.FETCH_SKIP,
                fetchId: 'fetch-id',
                resourceId: 'res-id',
                hasAfterAction: 'afterAction',
                isInfinite: true
            });
        });
    });

    describe('fetchingAction', () => {
        it('puts all params into the action', () => {
            const action = fetchHelper.fetchingAction('fetch-id', 'res-id');
            expect(action).toEqual({
                type: Actions.FETCH_FETCHING,
                fetchId: 'fetch-id',
                resourceId: 'res-id'
            });
        });
    });

    describe('receiveAction', () => {
        it('puts all params into the action', () => {
            const action = fetchHelper.receiveAction('fetch-id', 'res-id', 'data');
            expect(action).toEqual({
                type: Actions.FETCH_RECEIVE,
                fetchId: 'fetch-id',
                resourceId: 'res-id',
                data: 'data',
            });
        });
    });

    describe('failedAction', () => {
        it('puts all params into the action', () => {
            const action = fetchHelper.failedAction('fetch-id', 'res-id');
            expect(action).toEqual({
                type: Actions.FETCH_FAILED,
                fetchId: 'fetch-id',
                resourceId: 'res-id'
            });
        });
    });

    describe('fetchAction', () => {
        it('instantly dispatches "fetching"', () => {
            const store = mockStore({ ...defaultState }),
                fetchPromiseCreator = () => new Promise(utils.noop),
                thunk = fetchHelper.fetchAction({
                    fetchDesc: FetchDesc.USER,
                    resourceId: 'someId',
                    fetchPromiseCreator
                });
            thunk(store.dispatch, store.getState);
            expect(actionTypesInclude(store, Actions.FETCH_FETCHING)).toBe(true);
        });

        it('dispatches "receive" when the promise resolves', done => {
            let fetchPromiseResolve = null;
            const store = mockStore(defaultState),
                promise = new Promise((resolve) => {
                    fetchPromiseResolve = resolve;
                }),
                fetchPromiseCreator = () => promise,
                nowFunc = () => 10,
                thunk = fetchHelper.fetchAction({
                    fetchDesc: FetchDesc.USER,
                    resourceId: 'someId',
                    fetchPromiseCreator,
                    nowFunc
                }),
                thunkPromise = thunk(store.dispatch, store.getState);
            // not yet received
            expect(actionTypesInclude(store, Actions.FETCH_RECEIVE)).toBe(false);
            // resolve
            fetchPromiseResolve('fetch-data');
            thunkPromise
                .then(() => {
                    // receive
                    const action = actionsForType(store, Actions.FETCH_RECEIVE)[0];
                    expect(action).toEqual({
                        type: Actions.FETCH_RECEIVE,
                        fetchId: FetchDesc.USER.id,
                        resourceId: 'someId',
                        data: 'fetch-data',
                        isInfinite: undefined,
                        hasAfterAction: undefined,
                        expire: null
                    });
                    done();
                })
                .catch((err) => {
                    expect(err).toBe('then');
                });
        });

        it('dispatches "failed" if the promise gets rejected', done => {
            let fetchPromiseReject = null;
            const store = mockStore(defaultState),
                promise = new Promise((resolve, reject) => {
                    fetchPromiseReject = reject;
                }),
                fetchPromiseCreator = () => promise,
                thunk = fetchHelper.fetchAction({
                    fetchDesc: FetchDesc.USER,
                    resourceId: 'someId',
                    fetchPromiseCreator
                }),
                thunkPromise = thunk(store.dispatch, store.getState);
            // reject
            fetchPromiseReject('test-error');
            thunkPromise
                .then(() => {
                    expect('then').toBe('catch');
                })
                .catch(() => {
                    // failed
                    const action = actionsForType(store, Actions.FETCH_FAILED)[0];
                    expect(action).toEqual({
                        type: Actions.FETCH_FAILED,
                        fetchId: FetchDesc.USER.id,
                        resourceId: 'someId',
                        error: 'test-error'
                    });
                    done();
                });
        });

        it('dispatches "skip" if it\'s already fetching', done => {
            let fetchPromiseResolve = null;
            const state = cloneState();
            state.fetch.user.someId[fetchHelper.META_KEY].isFetching = true;
            const store = mockStore(state),
                promise = new Promise((resolve) => {
                    fetchPromiseResolve = resolve;
                }),
                fetchPromiseCreator = () => promise,
                thunk = fetchHelper.fetchAction({
                    fetchDesc: FetchDesc.USER,
                    resourceId: 'someId',
                    fetchPromiseCreator
                }),
                thunkPromise = thunk(store.dispatch, store.getState);
            // instant skip
            expect(actionTypesInclude(store, Actions.FETCH_SKIP)).toBe(true);
            fetchPromiseResolve('fetch-data');
            thunkPromise
                .then(() => {
                    // no more actions
                    expect(store.getActions().length).toBe(1);
                    done();
                })
                .catch((err) => {
                    expect(err).toBe('then');
                });
        });
    });

    describe('mockFetchState', () => {
        it('creates a correct fetch state for respurces with and without id', () => {
            const state = fetchHelper.mockFetchState([
                {
                    fetchDesc: { id: 'with' },
                    resourceId: 'id',
                    value: { name: 'name-with-id' }
                },
                {
                    fetchDesc: { id: 'without' },
                    value: { name: 'name-without-id' }
                }
            ]);
            expect(state.with.id.name).toBe('name-with-id');
            expect(state.without[fetchHelper.NO_ID].name).toBe('name-without-id');
        });
        it('works with a single prop too', () => {
            const state = fetchHelper.mockFetchState({
                fetchDesc: { id: 'single' },
                resourceId: 'id',
                value: { name: 'name-single' }
            });
            expect(state.single.id.name).toBe('name-single');
        });
    });

});
