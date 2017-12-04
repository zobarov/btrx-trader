'use strict'

const request = require('request');
const crypto = require('crypto');
const n = require('nonce')();

const config = require('config');

var PropertiesReader = require('properties-reader');
var apiKeyProperties = PropertiesReader('./secret/api_keys.properties');
var secretKeyProperties = PropertiesReader('./secret/secret_keys.properties');
var generalProperties = PropertiesReader('./secret/general.properties');

const baseApiUrl = generalProperties.read('trade.base.api.url');

const apiKey =  apiKeyProperties.read('tradelimit.api.key');
const secretKey = secretKeyProperties.read('tradelimit.secret.key');



class BtrxRequest {
  constructor(name, path) {
    this.name = name;
    this.fullpath = baseApiUrl + path;
    this.options = {
          url: this.fullpath,
          headers: {
            'Content-Type': 'application/json',
          }
    };
  }

  plain() {
    let nonce = n();
    this.preformedUrl = this.fullpath + '?nonce=' + nonce;
    return this;
  }

  preformed() {
    let nonce = n();
    this.preformedUrl = this.fullpath + '?apiKey=' + apiKey + '&nonce=' + nonce;
    return this;
  }

  addParam(pName, pVal) {
    this.preformedUrl = this.preformedUrl + '&' + pName + '=' + pVal;
    return this;
  }

  withBasicOptions() {
    var basicOptions = {
      url: this.preformedUrl,
      headers: {
          'Content-Type': 'application/json',
      }
    };
    this.options = basicOptions;
  }

  withSignedOptions() {
    const hmac = crypto.createHmac('sha512', secretKey);
    var hash = hmac.update(this.preformedUrl).digest('hex');
    //var hash = 'a hash non digested';
    var signedOptions = {
        url: this.preformedUrl,
        headers: {
            'apisign': hash,
            'Content-Type': 'application/json',
        }
    };
    hmac.end();
    this.options = signedOptions;
  }

  /*options() {
    console.log('Not signed request:' + this.preformedUrl);
    var options = {
        url: this.preformedUrl,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    return options;
  }*/

  signedOptions() {
    console.log('Hashing request:' + this.preformedUrl);
    const hmac = crypto.createHmac('sha512', secretKey);
    var hash = hmac.update(this.preformedUrl).digest('hex');
    //var hash = 'a hash non digested';
    var options = {
        url: this.preformedUrl,
        headers: {
            'apisign': hash,
            'Content-Type': 'application/json',
        }
    };
    hmac.end();
    return options;
  }

  getFinalUrl() {
    return this.preformedUrl;
  }

  getFinalOptions() {
    return this.options;
  }

}
/* Market */
BtrxRequest.MARKET_ALL = new BtrxRequest('MARKET_ALL', '/public/getmarkets');
BtrxRequest.MARKET_SUMMARY_ALL = new BtrxRequest('MARKET_SUMMARY_ALL', '/public/getmarketsummaries');
BtrxRequest.MARKET_SUMMARY = new BtrxRequest('MARKET_SUMMARY', '/public/getmarketsummary');
//BtrxRequest.MARKET_HISTORY = new BtrxRequest('MARKET_HISTORY', '/public/getmarkethistory');
BtrxRequest.MARKET_TICKER = new BtrxRequest('MARKET_TICKER', '/public/getticker');
/* Trader */
BtrxRequest.BUY_LIMIT = new BtrxRequest('BUY_LIMIT', '/market/buylimit');
BtrxRequest.SELL_LIMIT = new BtrxRequest('SELL_LIMIT', '/market/selllimit');
BtrxRequest.CANCEL_ORDER = new BtrxRequest('CANCEL_ORDER', '/market/cancel');
/* Orderbook */
BtrxRequest.ORDERBOOK = new BtrxRequest('ORDERBOOK', '/public/getorderbook');
BtrxRequest.ORDERBOOK_HISTORY = new BtrxRequest('ORDERBOOK_HISTORY', '/public/getmarkethistory');
/* Order */
BtrxRequest.MYORDER = new BtrxRequest('ORDER', '/account/getorder');
BtrxRequest.MYORDER_ALL_OPEN = new BtrxRequest('ORDER_ALL_OPEN', '/market/getopenorders');
/* Account */
BtrxRequest.WALLET_BALANCIES = new BtrxRequest('WALLET_BALANCIES', '/account/getbalances');
BtrxRequest.WALLET_BALANCE = new BtrxRequest('WALLET_BALANCE', '/account/getbalance');
/* Currency */
BtrxRequest.CURRENCIES = new BtrxRequest('CURRENCIES', '/public/getcurrencies');

module.exports = BtrxRequest;