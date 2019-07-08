/* global describe,it,expect,jest,global,afterEach */

import StockService from '../StockService';
import mock from '../../mock/recommendation';

// mock fetch
global.fetch = jest.fn();

describe('StockService', () => {

    it('gives proper stock prices result', done => {
        const stockService = new StockService();
        stockService.getStockPrices('APPL', 10)
            .then(value => {
                expect(value).toBeDefined();
                expect(value.length).toBe(10);
                done();
            }, err => {
                expect(err).toBeUndefined();
                done();
            });
    });

    it('gives proper social media counts result', done => {
        const stockService = new StockService();
        stockService.getSocialMediaCounts('APPL', 'twitter', 10)
            .then(value => {
                expect(value).toBeDefined();
                expect(value.length).toBe(10);
                done();
            }, err => {
                expect(err).toBeUndefined();
                done();
            });
    });

    it('gives proper recommendation result', done => {
        const stockService = new StockService();
        stockService.getStockRecommendation('APPL', 'twitter', 10, {}, mock.recommendationAlgorithm)
            .then(value => {
                expect(value).toBeDefined();
                expect(value.length).toBe(10);
                done();
            }, err => {
                expect(err).toBeUndefined();
                done();
            });
    });
});
