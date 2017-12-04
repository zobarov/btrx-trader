'use strict'

const http = require('http');
const logger = require('./app/server/util/logger/logger');

const BasicSellOnLevel = require('./app/server/ohlamon/basic/BasicSellOnLevel');

var runCounter = 0;
  
function webserver(req, res){
    runCounter++;
    if(runCounter > 1) {
        res.end('Skip as Run counter > 1');
        return;
    }

    logger.info('Starting server tasks...');
    var basicSellOnLevelOhlamon = new BasicSellOnLevel('BasicZEC', '*/30 * * * * *');
    basicSellOnLevelOhlamon.startOhlamonModel('ETH-ZEC', true);

    res.end('Scheduling has been started for ' + basicSellOnLevelOhlamon.tModelName);
};

http
    .createServer(webserver)
    .listen(3000, () => console.log('Server listening on port 3000...'));