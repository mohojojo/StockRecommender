/* global describe,it,expect */

import config from '../configService';
import { Environment } from '../../common/enums';

describe('configService', () => {

    it('has valid ENVIRONMENT', () => {
        const valid = Object.values(Environment);
        expect(valid.includes(config.ENVIRONMENT)).toBe(true);
    });

    it('BACKEND has valid BACKEND_BASE_URL', () => {
        expect(typeof config.BACKEND.BACKEND_BASE_URL).toBe('string');
        expect(config.BACKEND.BACKEND_BASE_URL.length).toBeGreaterThan(0);
    });

});
