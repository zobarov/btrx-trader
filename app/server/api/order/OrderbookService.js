'use strict'

const BtrxRequest = require('../../request/BtrxRequest');
const BtrxRequestAsync = require('../../request/BtrxRequestAsync');

const Orderbook = require('./Orderbook');
const OrderbookRecord = require('./OrderbookRecord');

class OrderbookSerice {
    constructor() {

    }

    async orderbook(marketName) {
        let btrxReq = BtrxRequest.ORDERBOOK
                                .plain();
        btrxReq.addParam('market', marketName);
        btrxReq.addParam('type', 'both');
        btrxReq.withBasicOptions();

        const res = await BtrxRequestAsync(btrxReq);

        if(res.success) {
             var bits = new Array();
            var asks = new Array();
            let orderbook = new Orderbook(bits, asks);
            for(var ind in res.result.buy) {
                var o = res.result.buy[ind];
                var orderbookRecord = new OrderbookRecord(o.Quantity, o.Rate);
                orderbook.addBitOrder(orderbookRecord);
            }

            for(var ind in res.result.sell) {
                var o = res.result.sell[ind];
                var orderbookRecord = new OrderbookRecord(o.Quantity, o.Rate);
                orderbook.addAskOrder(orderbookRecord);
            }
            return orderbook;
        } else {
            console.log('Cannot load orderbook');
            //TODO: make const:
            return new Orderbook();
        }
    }

    
    
}

module.exports = OrderbookSerice;