const express = require('express');

const pngImageFactory = require('./micr-to-png'); 

const app = express();

const port = process.env.PORT || 3030;

const defaults = {
    routingNumber: '121000248',    // number in string format
    accountNumber: '54942657528',
};

app.get('/micr-gen', (req, res) => {
    let { checkNumber, routingNumber = defaultRoutingNumber, accountNumber = defaultAccountNumber } = req.query;

    if (!checkNumber || !routingNumber || !accountNumber) {

        res.status(400).send('Missing required parameters.');

    } else {
        let buf = pngImageFactory.generateMICRLinePng(checkNumber, routingNumber, accountNumber);

        console.log('--- Generated MICR line image for check #: ', checkNumber);

        res.set('Content-Type', 'image/png');

        res.send(buf);
    }
});

app.listen(port, () => {
    console.log(`MICR line image factory is running on port ${port}.`);
});

module.exports = app;

