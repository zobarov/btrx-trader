'use strict'
const OrderbookRecord = require('./OrderbookRecord');

class Orderbook {
    constructor(bitOrders, askOrders) {
        this.bitOrders = bitOrders;
        this.askOrders = askOrders;
    }

    addBitOrder(order) {
        this.bitOrders.push(order);

    }
    addAskOrder(order) {
        this.askOrders.push(order);

    }

    toString() {
        return 'Orderbook:' + ',bids=' + this.bitOrders.length + ', asks=' + this.askOrders.length;
    }
}

module.exports = Orderbook;