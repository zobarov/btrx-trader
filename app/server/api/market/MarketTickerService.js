'use strict'
const BtrxRequest = require('../../request/BtrxRequest');
const BtrxRequestAsync = require('../../request/BtrxRequestAsync');
const MarketTicker = require('./MarketTicker');

class MarketTickerService {
    constructor() {

    }

    async ticker(marketName) {
        let btrxReq = BtrxRequest.MARKET_TICKER
                            .plain();
        btrxReq.addParam('market', marketName);

        const res = await BtrxRequestAsync(btrxReq);
        if(res.success) {
            console.log('Got ticker!');
            let ticker = new MarketTicker(marketName,
                                          res.result.Bid,
                                          res.result.Ask,
                                          res.result.Last);
            console.log(ticker.toString());
            return ticker;
        } else {
            console.log('Ticker not found');
            //TODO: make const:
            return new Ticker('N/A', 0, 0, 0);
        }
    }
}

module.exports = MarketTickerService;