import * as fetchHelper from '../common/fetchHelper';
import { FetchDesc } from '../common/fetchDesc';
import services from '../services/serviceHolder';
import mock from '../mock/recommendation';

export const getStockRecommendation = (symbol, provider, timeWindow, extraOptions) => {
    return fetchHelper.fetchAction({
        fetchDesc: FetchDesc.STOCKRECOMMENDATIONS,
        fetchPromiseCreator: () => services.waitForInit
            .then(() =>
                services.StockService
                    .getStockRecommendation(symbol, provider, timeWindow, extraOptions, mock.recommendationAlgorithm))
    });
};
