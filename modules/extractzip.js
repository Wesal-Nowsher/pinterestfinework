
const puppeteer = require('puppeteer');
const decompress = require('decompress');

async function extractzip (url) {
    var filesarry=[];
    let files= await decompress('modules/new.zip');

    return files;
}
module.exports = extractzip;