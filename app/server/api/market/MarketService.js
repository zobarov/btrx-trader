'use strict'
const request = require('request');
const BtrxRequest = require('../../request/BtrxRequest');
const Market = require('./Market');

class MarketService {
    constructor(id) {
        this.marketServiceId = id;
        this.marketCache = [];
    }
    
    updateMarketCache(markets) {
        this.marketCache = markets;
    }
    async inMarkets() {
        if(this.marketCache.length > 0) {
            console.log('Return precached markets');
            return this.marketCache;
        }
        const markets = await this.listMarkets();
        return markets;
    } 


    listMarkets() {
        let btrxReq = BtrxRequest.MARKET_ALL
                        .plain();
        btrxReq.withBasicOptions();
        var options = btrxReq.getFinalOptions();    
        var marketList = [];

        var p1 = new Promise((resolve, reject) => {
            request(options, function(err, res, body) {
                if(err) {
                    console.log('Error recieving markets:' + err);
                    reject(err);
                }
                let json = JSON.parse(body);
                var markets = [];
                for(var ind in json.result) {
                    var m = json.result[ind];
                    if(m.IsActive) {
                        var market = new Market(m.MarketName,
                                                m.BaseCurrency,
                                                m.MarketCurrency,
                                                m.MinTradeSize);
                        markets.push(market);
                    } else {
                        console.log('Inactive market: ' + m.MarketName);
                    }
                }
                resolve(markets);
             });
        });
        return new Promise((resolve, reject) => {
            p1.then(markets => {
                this.marketCache = markets;
                resolve(markets);
            });
        });
    }

    getMarket(name) {
        if(this.marketCache.length === 0) {
            throw new Error('Market cache is empty.');
        }
        for(var ind in this.marketCache) {           
            var m = this.marketCache[ind];
            if(m.marketName === name) {
                return m;
            }
        } 
    }

    ticker(marketName) {

    }


}

module.exports = MarketService;