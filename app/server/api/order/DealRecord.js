'use strict'

class DealRecord {
    constructor(type, quantity, price) {
        this.type = type;
        this.quantity = quantity;
        this.price = price;
    }

    isBuy() {
        return this.type === 'BUY';
    }

    isSell() {
        return this.type === 'SELL';
    }

    info() {
        return 'deal:' + this.type + '->' + this.quantity + '@' + this.price;
    }
}

module.exports = DealRecord;