'use strict'

class MarketTicker {
    constructor(market, bid, ask, last) {
        this.market = market;
        this.bid = bid;
        this.ask = ask;
        this.last = last;
    }

    getMarket() {
        return this.market;
    }

    getBid() {
        return this.bid;
    }
    getAsk() {
        return this.ask;
    }
    getLast() {
        return this.last;
    }

    toString() {
        return '{Ticker [' + this.market
                + '] bid=' + this.bid
                + ', ask=' + this.ask
                + ', last=' + this.last
                + '}';
    }
}

module.exports = MarketTicker;