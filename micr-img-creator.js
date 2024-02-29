// lham@rcpsolutions

const { createCanvas, registerFont } = require('canvas');

const lastFontNameLoaded = null;

const loadFont = (fontFilename = 'micr-e13b.tff', fontFamily = 'E13B', fontName = '18pt "MICR E13B"') => {
    try {
        registerFont(`./fonts/${fontFilename}`, { family: fontFamily });

        lastFontNameLoaded = fontName;
    } catch(e) {
        console.log(e);

        throw new Error('Error loading font');
    }
}

const generateMICRLineImage = (checkNumber, routingNumber, accountNumber, contentType = 'image/png') => {
    const canvas = createCanvas(700, 50);
    const ctx = canvas.getContext('2d');

    ctx.font = lastFontNameLoaded;

    try {
        ctx.fillText(`C${checkNumber}C A${routingNumber}A   ${accountNumber}C`, 10, 25, 700);
    } catch(e) {
        console.log(e)
    }  

    return canvas.toBuffer(contentType);
};


loadFont();

module.exports = {
    loadFont,
    generateMICRLineImage
}
