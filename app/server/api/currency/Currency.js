'use strict'

class Currency {
    constructor(name, txFee) {
        this.name = name;
        this.txFee = txFee;
    }

    toString() {
        return 'Curr:' + this.name + ',trFee=' + this.txFee;
    }
}

module.exports = Currency;