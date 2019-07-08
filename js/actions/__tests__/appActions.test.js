/* global describe,it,expect */

import * as appActions from '../appActions';
import { Action } from '../../common/enums';

describe('appActions', () => {

    it('setServicesLoaded', () => {
        const action = appActions.setServicesLoaded();
        expect(action.type).toBe(Action.SET_SERVICES_LOADED);
    });

    it('setLoading', () => {
        const action = appActions.setLoading();
        expect(action.type).toBe(Action.SET_LOADING);
    });

    it('clear', () => {
        const action = appActions.clear();
        expect(action.type).toBe(Action.CLEAR);
    });

});
