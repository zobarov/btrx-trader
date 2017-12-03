'use strict'
const BtrxRequest = require('../../request/BtrxRequest');
const BtrxRequestAsync = require('../../request/BtrxRequestAsync');

const DealRecord = require('./DealRecord');
const DealSwap =  require('./DealSwap');

class DealService {
    constructor() {

    }

    async swapDeals(marketName) {
        let btrxReq = BtrxRequest.ORDERBOOK_HISTORY
                                .plain();
        btrxReq.addParam('market', marketName);
        btrxReq.withBasicOptions();

        const res = await BtrxRequestAsync(btrxReq);

        if(res.success) {
            var deals = new Array();
            var buys = new Array();
            var sells = new Array();
            let dealSwap = new DealSwap(deals, buys, sells);
            for(var ind in res.result) {
                var d = res.result[ind];
                let dealRecord = new DealRecord(d.OrderType, d.Quantity, d.Price);
                dealSwap.addDeal(dealRecord);
            }
            return dealSwap;
        } else {
            console.log('Cannot load deal swap');
            //TODO: make const:
            return new Orderbook();
        }
    }
}

module.exports = DealService;