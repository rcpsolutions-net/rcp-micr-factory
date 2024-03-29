const express = require('express');

const imageFactory = require('./micr-img-creator'); 

const app = express();

const port = process.env.PORT || 3030;

const defaults = {
    routingNumber: '121000248',    // number in string format
    accountNumber: '54942657528',
    contentType: 'image/png'
};

app.get('/micr-gen', (req, res) => {
    let { checkNumber, 
          routingNumber = defaults.routingNumber, 
          accountNumber = defaults.accountNumber,
          contentType = defaults.contentType,
        } = req.query;

    if (!checkNumber || !routingNumber || !accountNumber) {

        res.status(400).send('Missing required parameters.');

    } else {
        let buf = null;

        switch (contentType) {
            case 'image/jpeg':
                buf = imageFactory.generateMICRLineImage(checkNumber, routingNumber, accountNumber, contentType);

                break;

            default:
                if( !defaults.contentType ) defaults.contentType = 'image/png';

                buf = imageFactory.generateMICRLineImage(checkNumber, routingNumber, accountNumber, defaults.contentType);

                break;
        }

        console.log(`--- ${buf.length} bytes of ${contentType} generated (check # ${checkNumber})`);

        res.set('Content-Type', contentType);
        res.set('Content-Size', buf.length);
        
        res.send(buf);
    }
});

app.listen(port, () => {
    console.log(`MICR line image factory is running on port ${port}.`);
});

module.exports = app;

