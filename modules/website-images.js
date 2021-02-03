const puppeteer = require('puppeteer');
const imageToBase64 = require('image-to-base64');

async function getImages(url) {
    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36 WAIT_UNTIL=load");

    try {
        await page.goto(url, {
            waitUntil: 'networkidle2',
            timeout: 45000
        });
    } catch (e) {
        try {
            await page.goto(url, {
                waitUntil: 'load',
                timeout: 45000
            });
        } catch (e) {
            throw 'Cannot open the URL';
        }
    }

    await autoScroll(page);

    let images = await page.evaluate(() => {
        const images = document.querySelectorAll(`img`);
        let imagesFiltered = [];

        images.forEach(function(img) {
            if (img.offsetWidth > 5) {
                imagesFiltered.push(img.src);
            }
        });
        return imagesFiltered;
    });

    images = images.filter((v, i, a) => a.indexOf(v) === i); // get unique URLs

    let imagesArray = [];

    for (let i in images) {
        try {
            let imageBase64 = await imageToBase64(images[i]);

            if (imageBase64) {
                imagesArray.push(imageBase64);
            }
        } catch (e) {

        }
    }

    await browser.close();

    return imagesArray;
}

async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 300;
            var scrollHeight = document.body.scrollHeight;

            var timer = setInterval(() => {
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}


module.exports = getImages;