'use strict'

const request = require('request');

const hmac = crypto.createHmac('sha512', 'c903bd9db8be421d8327a0292afb9da0');




var TraderRequest = function(plainUrl) {
    var hash = hmac.update(plainUrl).digest('hex');
    
    var options = {
        url: plainUrl,
        headers: {
            'apisign': hash,
           'Content-Type': 'application/json',
        }
    }; 
}

var baseRequest = request.defaults({
    headers: {'x-token': 'my-token'}
})

module.exports = TraderRequest;
  