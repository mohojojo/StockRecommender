/* global describe,it,expect,jest,global,beforeEach */

import { FetchDesc } from '../../common/fetchDesc';
import * as stockActions from '../stockActions'
import serviceHolder from '../../services/serviceHolder';

// TODO: would be nice to extract this into a generic service holder mock.
// mock service holder (i have to replicate the piksel response and it's not using camelcase)
const mockValuePromiseByKey = (values = {}, key, undefMessage) => {
    const result = values[key];
    if (result === undefined) {
        console.error(undefMessage, key);
    }
    return Promise.resolve(result);
};

jest.mock('../../services/serviceHolder', () => ({
    piksel: {
        help: () => Promise.resolve(mockData.piksel.help || {}),
        channels: (id) => Promise.resolve(mockData.piksel.channels[id])
    },
    appgrid: {
        getConfig: key => mockValuePromiseByKey(mockData.appgrid.getConfig, key, 'Unmocked getConfig key'),
        getAssetByKey: key => mockValuePromiseByKey(mockData.appgrid.getAssetByKey, key, 'Unmocked getAssetByKey key'),
        getAllConfigs: () => Promise.resolve(mockData.appgrid.getAllConfigs)
    },
    waitForInit: Promise.resolve(),
}));

// mock fetchHelper
// we mock this out, so we don't have to test what the helper does, only what the actions call it with.
jest.mock('../../common/fetchHelper', () => ({
    fetchAction: ({ fetchDesc, resourceId, fetchPromiseCreator }) => ({
        fetchDesc,
        resourceId,
        fetchPromise: fetchPromiseCreator(),
    }),
    getFetchResult: () => ({}),
    getFetchMeta: () => ({})
}));

describe('stockActions', () => {

    describe('getStockRecommendation', () => {
        it('should get recommendations', done => {
            const { fetchDesc, fetchPromise } = stockActions.getStockRecommendation('APPL','twitter', 10);
            serviceHolder.StockService = {
                getStockRecommendation: () => Promise.resolve({
                    data: true
                })
            };

            expect(fetchDesc).toEqual(FetchDesc.STOCKRECOMMENDATIONS);
            fetchPromise
                 .then(res => {
                     expect(res).toBeDefined();
                     expect(res.data).toBeDefined();
                     expect(res.data).toBe(true)
                     done();
                 }, err => {
                     expect(err).toBe('then');
                     done();
                 });
        });
    });
});
