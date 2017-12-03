'use strict'

class Sell {
    constructor(market, quantity, rate) {
        this.market = market;
        this.quantity = quantity;
        this.rate = rate;
    }

    setUuid(uuid) {
        this.uuid = uuid;
    }

    getUuid() {
        return this.uuid;
    }

    getMarket() {
        return this.market;
    }
    getQuantity() {
        return this.quantity;
    }
    getRate() {
        return this.rate;
    }
}

module.exports = Sell;