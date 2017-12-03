'use strict'
var request = require('request');

const BtrxRequest = require('../../request/BtrxRequest');

class TradeService {
    constructor(id) {
        this.tradeServiceId = id;
    }

    sell(Sell) {
        let btrxReq = BtrxRequest.SELL_LIMIT
                            .preformed();
        btrxReq.addParam('market',      Sell.getMarket())
               .addParam('quantity',    Sell.getQuantity())
               .addParam('rate',        Sell.getRate());

        var options = btrxReq.signedOptions();

        request(options, function(err, res, body) { 
            console.log('URL:' + options.url);
            console.log('HMAC:' + options.headers.apisign);

            let json = JSON.parse(body);
            console.log(json);
            return json;
        });

    }

    cancelSell(Sell) {
        if(Sell.getUuid() === undefined) {
            console.log('SKIP as Undefined UUID for canceling Sell');
            return;
        }

        let btrxReq = BtrxRequest.CANCEL_ORDER
                            .preformed();
        btrxReq.addParam('uuid',      Sell.getUuid());

        var options = btrxReq.signedOptions();        

        request(options, function(err, res, body) { 
            console.log('URL:'  + options.url);
            console.log('HMAC:' + options.headers.apisign);

            let json = JSON.parse(body);
            console.log(json);
            return json;
        });
    }

    buy(Buy) {
        let btrxReq = BtrxRequest.BUY_LIMIT
                                .preformed();
        btrxReq.addParam('market',      Buy.getMarket())
               .addParam('quantity',    Buy.getQuantity())
               .addParam('rate',        Buy.getRate());
    
        var options = btrxReq.signedOptions();
        var resp = {success: 'false'};

        request(options, function(err, res, body) { 
            console.log('URL:' + options.url);
            console.log('HMAC:' + options.headers.apisign);

            let json = JSON.parse(body);
            console.log(json);
            resp = json;

        });
        return resp;
    }

    cancelBuy(Buy) {
        if(Buy.getUuid() === undefined) {
            console.log('SKIP as Undefined UUID for canceling Buy');
            return;
        }
        
        let btrxReq = BtrxRequest.CANCEL_ORDER
                                .preformed();
        btrxReq.addParam('uuid',      Buy.getUuid());
        
        var options = btrxReq.signedOptions();        
        
        request(options, function(err, res, body) { 
            console.log('URL:'  + options.url);
            console.log('HMAC:' + options.headers.apisign);
        
            let json = JSON.parse(body);
            console.log(json);
            return json;
        });
    }
}

module.exports = TradeService;