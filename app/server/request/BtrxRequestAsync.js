'use strict'
const request = require('request');

const BtrxRequestAsync = async function(btrxRequest) {
    var  options = btrxRequest.getFinalOptions();
    //console.log('Requesting: ' + options.url);

    return new Promise((resolve, reject) => {
        request(options, function(err, res, body) {
            if(err) {
                console.log('Error in requesting:' + btrxRequest.getFinalUrl());
                console.log('Error:' + err);
                reject(err);
            } else {
                let json = JSON.parse(body);
                //console.log('Got res:' + body);
                resolve(json);
            }           
         });
    });
}

module.exports = BtrxRequestAsync;