'use strict'
const request = require('request');
const BtrxRequest = require('../../request/BtrxRequest');
const Currency = require('./Currency');

class CurrencyService {
    constructor() {
        this.currencyCache = [];   
    }

    async cache() {
        this.listCurrencies().then(currencies => {          
            for(var ind in currencies) {
                var currency = currencies[ind];
                this.currencyCache.push(currency);
            }
            console.log('Cached currencies amount:' + this.currencyCache.length);
            return this.currencyCache;
        })
    };

    listCurrencies() {
        let btrxReq = BtrxRequest.CURRENCIES
                    .preformed();

        var options = btrxReq.options();   

        var p1 = new Promise((resolve, reject) => {
            request(options, function(err, res, body) {
                if(err) {
                    console.log('Error recieving currencies:' + err);
                    reject(err);
                }
                let json = JSON.parse(body);
                var currencies = [];
                for(var ind in json.result) {
                    var curr = json.result[ind];
                    if(curr.IsActive) {
                        var currency = new Currency(curr.Currency, curr.TxFee);
                        currencies.push(currency);
                        
                    } else {
                        console.log('Inactive currency: ' + curr.Currency);
                    }
                }
                resolve(currencies);
            });           
        });
        return new Promise((resolve, reject) => {
            p1.then(currencies => {
                this.currencyCache = currencies;
                resolve(currencies);
            });
        });
    }

    currency(currencyName) {
        console.log('Searching:' + currencyName);
        for(var ind in this.currencyCache) {
            if(currencyName === this.currencyCache[ind].name) {
                console.log('Found:' + currencyName);
                return this.currencyCache[ind].name;
            }
        }
        console.log('Not Found:' + currencyName);
    }

}

module.exports = CurrencyService;