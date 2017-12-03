'use strict'
const Deal = require('./DealRecord');

class DealSwap {
    constructor(deals, buyDeals, sellDeals) {
        this.deals = [];
        this.buyDeals = [];
        this.sellDeals = [];
    }

    addDeal(deal) {
        if(deal.isBuy()) {
            this.addBuyDeal(deal);
        }
        if(deal.isSell()) {
            this.addSellDeal(deal);
        }
    }

    addBuyDeal(buyDeal) {
        this.deals.push(buyDeal);
        this.buyDeals.push(buyDeal);
    }

    lastDeal() {
       return this.deals[this.deals.length - 1];
    }

    addSellDeal(sellDeal) {
        this.deals.push(sellDeal);
        this.sellDeals.push(sellDeal);
    }

    maxInLastTenPrice() {
        var lastTens = this.deals.slice(0, 10);
        lastTens.sort(function(a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
        return lastTens[9];
    }

    maxBuy() {
        //var maxOfBuy = Math.max.apply(Math, this.buyDeals.Price);
        return Math.max.apply(Math, this.buyDeals.map(function(o){return o.price;}))
    }

    minSell() {
        //var maxOfBuy = Math.max.apply(Math, this.buyDeals.Price);
        return Math.min.apply(Math, this.sellDeals.map(function(o){return o.price;}))
    }

    info() {
        return 'Deals all/buy/sell [' + this.deals.length + '/'
                                     + this.buyDeals.length + '/'
                                     + this.sellDeals.length
                                     + ']';
    }
}

module.exports = DealSwap;