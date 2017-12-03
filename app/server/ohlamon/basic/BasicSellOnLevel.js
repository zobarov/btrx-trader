'use strict'
const schedule = require('node-schedule');
const DealService = require('../../api/order/DealService');

const Trader = require('../../api/trader/TradeService');
const Sell = require('../../api/trader/Sell');

const MarketService = require('../../api/market/MarketService');
const Market = require('../../api/market/Market');

//const say = require('say');

class BasicSellOnLevel {
    constructor(name, schedule) {
        this.tModelName = name;
        this.schedule = schedule;
        this.stopSelling = false;
        this.pingCounter = 0;
    }

    startOhlamonModel(marketName, noSell) {
        //say.speak('Starting ohlamon for ' + marketName);
        var dealService = new DealService();
        var self = this;
        var job = schedule.scheduleJob(this.schedule, function() {
            self.pingCounter++;
            console.log('------[' + self.pingCounter + '] ' + '---> pinging market:' + marketName);
            dealService.swapDeals(marketName).then(dealSwap => {
                console.log(dealSwap.info());
                var lastDeal = dealSwap.maxInLastTenPrice();
                self.rememberLastDealPrice(lastDeal.price);

                console.log('Max in last ten:' + lastDeal.info());
                console.log('Max buy/Min Sell  -> ['  + dealSwap.maxBuy()   + ' / ' + dealSwap.minSell() + ']');

                if(self.stopSelling) {
                    console.log('Selling IS stopped for this Ohlamon');
                    return;
                }

                if(self.matchSellConditions(dealSwap)) {
                    //say.speak('Selling Conditions matched. ');
                    console.log('!!!!!!! Selling Condition for ' + marketName);
                    if(noSell) {
                        console.log('NO Selling configured!!!!');
                        return;
                    }


                    const trader = new Trader('Selling on ' + marketName);

                    const marketService = new MarketService();
                    marketService.listMarkets().then(markets => {
                        var market = marketService.getMarket(marketName);

                        var minTradeAmount = market.minTradeAmount;

                        console.log('Min trade amount for market: ' + minTradeAmount);

                        var sell1 = new Sell('ETH-ZEC', minTradeAmount, 0.75);
                        
                        var uuid = trader.sell(sell1);
                        
                        console.log('Placed the order: ' + uuid);
                        self.stopSelling = true;
                    })
                }
            })
        });
    }

    rememberLastDealPrice(price) {
        this.lastDealPrice = price;
        console.log('Remembering last price as:' + this.lastDealPrice);
    }

    matchSellConditions(dealSwap) {
        if(this.lastDealPrice === undefined) {
            return false;
        }
        console.log('Checking comditions for :' + dealSwap.lastDeal().price + 'vs.' + this.lastDealPrice);
        if(dealSwap.lastDeal().price > this.lastDealPrice) {
            
            return true;
        }
        return false;
    }
}

module.exports = BasicSellOnLevel;