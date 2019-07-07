import moment from 'moment';
import mock from '../mock/recommendation';

const defaultHeaders = {
    accept: 'application/json',
    'Content-Type': 'application/json'
};

const LOG_HEADER = '[StockService]:';

class StockService {

    /**
     * Create a StockService instance.
     * @param {string} baseUrl The  base URL for the API calls e.g. "http://myservice.com/api/1.2/".
     */
    constructor(baseUrl) {
        // ASSIGMENTS
        this.baseUrl = baseUrl;
    }

    /**
     * Create request
     * @param {string} method Request method
     * @param {string} endpoint API method name
     * @param {object} opts optional object for the request e.g. body, headers
     * @returns {Promise} Promise of response data
     */
    _request(method, endpoint, opts) {
        return this._plainRequest(method, endpoint, opts);
    }

    /**
     * Create request without extra url parameters
     * @param {string} method Request method
     * @param {string} endpoint API method name
     * @param {object} opts Optional request properties e.g. body, headers
     * @returns {Promise} Promise of response data
     */
    _plainRequest(method, endpoint, opts = {}) {
        // prepare request
        const { headers = defaultHeaders, body = '' } = opts,
            url = [this.baseUrl, endpoint]
                .filter(value => value)
                .join('/');
        if (body) {
            opts.body = JSON.stringify(body);
        }

        const options = {
            ...opts,
            method,
            headers
        };
        // start fetching
        return fetch(url, options)
            .then(res => {
                // should we throw it as an error?

                // if (res.status === 403) {
                //     return res.json();
                // }

                if (res.status && res.status >= 400) {
                    return res.json()
                        .then(json => {
                            throw new Error(JSON.stringify({ ...json, status: res.status }));
                        });
                }
                return res.text()
                    .then((text) => text.length ? JSON.parse(text) : {})
                    .then(json => {
                        if (json === '404 Not Found') {
                            throw new Error(json);
                        }
                        console.debug(LOG_HEADER, 'FETCHED:', url, ' - STATUS:', res.status);
                        return Promise.resolve(json);
                    });

            })
            .catch(err => {
                console.error(LOG_HEADER, url, err);
                throw err;
            });
    }

    static fail(res) {
        // TODO: Update if there is default error message.
        throw res;
    }

    getStockPrices(symbol, timeWindow) {

        // MOCK HTTP REQUEST
        const prices = mock.stockPriceGenerator(symbol, moment().subtract(timeWindow - 1, 'd'));
        return Promise.resolve(prices);

        return this._plainRequest('POST', 'prices', {
            body: {
                symbol,
                timeWindow
            }
        }).then(
            res => {
                if (res) {
                    // valid response
                    return res;
                }
                return StockService.fail(res);
            },
            StockService.fail
        );
    }

    getSocialMediaCounts(symbol, provider, timeWindow) {
        // MOCK HTTP REQUEST
        const socialMediaCounts =
            mock.socialMediaCountGenerator(symbol, provider, moment().subtract(timeWindow - 1, 'd'));
        return Promise.resolve(socialMediaCounts);

        return this._plainRequest('POST', 'recommend', {
            body: {
                symbol,
                provider,
                timeWindow
            }
        }).then(
            res => {
                if (res) {
                    // valid response
                    return res;
                }
                return StockService.fail(res);
            },
            StockService.fail
        );
    }

    getStockRecommendation(symbol, provider, timeWindow, extraOptions, algorithm) {
        // MOCK HTTP REQUEST
        return Promise.all([this.getStockPrices(symbol, timeWindow),
            this.getSocialMediaCounts(symbol, provider, timeWindow)])
            .then(results => {
                const recommendation = algorithm(results[0], results[1], extraOptions);
                return recommendation;
            });

        return this._plainRequest('POST', 'recommend', {
            body: {
                symbol,
                provider,
                timeWindow
            }
        }).then(
            res => {
                if (res) {
                    // valid response
                    return res;
                }
                return StockService.fail(res);
            },
            StockService.fail
        );
    }
}

export default StockService;
