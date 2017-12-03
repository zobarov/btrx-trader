'use strict'
const BtrxRequest = require('../../request/BtrxRequest');
const BtrxRequestAsync = require('../../request/BtrxRequestAsync');

const Order = require('./Order');

class OrderService {
    constructor() {
    }

    async order(uuid) {
        let btrxReq = BtrxRequest.MYORDER
                        .preformed();
        btrxReq.addParam('uuid', uuid);
        btrxReq.withSignedOptions();

        const res = await BtrxRequestAsync(btrxReq);
        if(res.success) {
            console.log('Got order:');
            var order = new Order(res.result.OrderUuid, res.result.Exchange,
                                res.result.Type, res.result.Quantity);
            console.log('Got order uuid::' + order.uuid);
            return order;
        } else {
            console.log('Order not found');
            //TODO: make const:
            return new Order('N/A', 'N/A', 'N/A', 0);
        }
    }

    //BUY/SELL
    async openOrders(type) {
        let btrxReq = BtrxRequest.MYORDER_ALL_OPEN
                            .preformed();
        btrxReq.withSignedOptions();
        //console.log(btrxReq.getFinalUrl());
        //console.log(btrxReq.getFinalOptions());
        const res = await BtrxRequestAsync(btrxReq);
        var openOrders = [];
        if(res.success) {
            console.log('Got open orders:' + res.result);
            for(var ind in res.result) {
                var o = res.result[ind];
                var order = new Order(o.OrderUuid, o.Exchange, o.Type, o.Quantity);
                openOrders.push(order);
            }

            return openOrders;
        } else {
            console.log('No open orders found');
            return openOrders;
        }
    }
}

module.exports = OrderService;