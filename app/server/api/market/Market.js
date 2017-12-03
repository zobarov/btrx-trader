'use strict'

class Market {
    constructor(marketName, baseCurrency, tradeCurrency, minTradeSize) {
        this.marketName = marketName;
        this.baseCurrency = baseCurrency;
        this.tradeCurrency = tradeCurrency;
        this.minTradeAmount = minTradeSize;
    }
}

module.exports = Market;