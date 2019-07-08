/* global describe,it,expect */

import * as errorActions from '../errorActions';
import { Action } from '../../common/enums';

describe('modalActions', () => {

    it('Return ERROR type in sending error', () => {
        expect(
            errorActions.errorSendAction().type
        ).toBe(Action.ERROR);
    });

});
