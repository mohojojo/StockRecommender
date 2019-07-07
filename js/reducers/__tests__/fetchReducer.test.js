/* global describe,it,expect */

import fetchReducer, { getFetchResult } from '../fetchReducer';
import * as fetchHelper from '../../common/fetchHelper';

const defaultState = {};

describe('fetchReducer', () => {

    it('has initial state', () => {
        const state = fetchReducer(undefined, {});
        expect(state).toBeDefined();
    });

    it('handles undefined action', () => {
        const state = fetchReducer(undefined, undefined);
        expect(state).toBeDefined();
    });

    it('merges state properly for FETCH_FETCHING', () => {
        const action = fetchHelper.fetchingAction('help', 'someId'),
            newState = fetchReducer(defaultState, action);
        expect(newState).toBeDefined();
        expect(newState.help.someId[fetchHelper.META_KEY]).toEqual({
            isFetching: true,
            isFetched: false,
            isUnfetched: false,
            isError: false,
            error: null,
            expire: 0,
            isWaiting: false,
            hasAfterAction: false
        });
    });

    it('merges state properly for FETCH_RECEIVE', () => {
        const action = fetchHelper.receiveAction('help', 'someId', 'data', 123),
            newState = fetchReducer(defaultState, action);
        expect(newState).toBeDefined();
        expect(newState.help.someId[fetchHelper.META_KEY]).toEqual({
            isFetching: false,
            isFetched: true,
            isUnfetched: false,
            isError: false,
            error: null,
            expire: 123,
            isWaiting: false,
            hasAfterAction: false
        });
    });

    it('merges state properly for FETCH_FAILED', () => {
        const action = fetchHelper.failedAction('help', 'someId', 'error'),
            newState = fetchReducer(defaultState, action);
        expect(newState).toBeDefined();
        expect(newState.help.someId[fetchHelper.META_KEY]).toEqual({
            isFetching: false,
            isFetched: false,
            isUnfetched: false,
            isError: true,
            error: 'error',
            expire: 0,
            isWaiting: false,
            hasAfterAction: false
        });
    });

    it('merges state properly for FETCH_REMOVE', () => {
        const action = fetchHelper.removeAction('help', 'someId'),
            oldState = { help: { someId: 'something' } },
            newState = fetchReducer(oldState, action);
        expect(newState).toBeDefined();
        expect(newState.help.someId).toBeNull();
    });

});

describe('fetchReducer.getFetchResult', () => {
    it('selects state properly for resources with id', () => {
        const state = {
                help: {
                    someId: {
                        testId: 'help-with-id'
                    }
                }
            },
            result = getFetchResult(state, 'help', 'someId');
        expect(result.testId).toBe('help-with-id');
    });

    it('selects state properly for resources without id', () => {
        const state = {
                help: {
                    [fetchHelper.NO_ID]: {
                        testId: 'help-without-id'
                    }
                }
            },
            result = getFetchResult(state, 'help');
        expect(result.testId).toBe('help-without-id');
    });
});
