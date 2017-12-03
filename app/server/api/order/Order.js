'use strict'

class Order {
    constructor(uuid, exchange, type, quantity) {
        this.uuid = uuid;
        this.exchange = exchange;
        this.type = type;
        this.quantity = quantity;
    }
}

module.exports = Order;