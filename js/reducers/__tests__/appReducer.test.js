/* global describe,it,expect */

import appReducer from '../appReducer';
import { Action } from '../../common/enums';

describe('appReducer', () => {

    it('SET_SERVICES_LOADED sets the loaded flag', () => {
        const action = {
                type: Action.SET_SERVICES_LOADED
            },
            newState = appReducer(undefined, action);
        expect(newState).toBeDefined();
        expect(newState.loaded && newState.loaded.services).toBe(true);
    });

    it('SET_LOADING sets the loading', () => {
        const action = {
                type: Action.SET_LOADING,
                isLoading: true
            },
            newState = appReducer(undefined, action);
        expect(newState).toBeDefined();
        expect(newState.loaded && newState.loaded.isLoading).toBe(true);
    });

    it('MESSAGE sets message', () => {
        const action = {
                type: Action.MESSAGE,
                message: 'Cool message'
            },
            newState = appReducer(undefined, action);
        expect(newState).toBeDefined();
        expect(newState.message).toBe('Cool message');
    });
});
