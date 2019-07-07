import moment from 'moment';

const mock = {

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    },

    stockPriceGenerator(symbol, date) {
        let prices = [];
        const now = moment().add(1, 'days');

        for (let m = date; !m.isSame(now, 'day'); m.add(1, 'days')) {
            prices.push({
                symbol,
                price: this.getRandomInt(200, 1000),
                date: moment(m)
            });
        }

        return prices;
    },

    socialMediaCountGenerator(symbol, provider, date) {
        let counts = [];
        const now = moment().add(1, 'days');

        for (let m = date; !m.isSame(now, 'day'); m.add(1, 'days')) {
            counts.push({
                provider,
                symbol,
                count: this.getRandomInt(1, 100),
                date: moment(m)
            });
        }

        return counts;
    },

    recommendationAlgorithm(prices, socialCounts) {

        // 0 = BUY, 1 = KEEP, 2 = SELL
        let recommendations = [];

        for (let i = 0; i < prices.length; i += 1) {
            let recomm = 'Hold';
            if (prices[i].price > 300 && socialCounts[i].count > 50) {
                recomm = 'Buy';
            } else if (prices[i].price > 500 && socialCounts[i].count > 50) {
                recomm = 'Hold';
            } else if (prices[i].price > 600 && socialCounts[i].count > 70) {
                recomm = 'Sell';
            }

            recommendations.push({
                id: i,
                recommendation: recomm,
                symbol: prices[i].symbol,
                date: prices[i].date,
                price: prices[i].price,
                socialCount: socialCounts[i].count,
                provider: socialCounts[i].provider,
            });
        }

        return recommendations;
    }
};

export default mock;
