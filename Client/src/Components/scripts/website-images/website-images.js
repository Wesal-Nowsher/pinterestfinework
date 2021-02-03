const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');

if (process.argv.length != 3) {
    console.log('Wrong arguments!');
    console.log('Example: node website-images.js https://google.com');
    process.exit();
}

(async () => {
    const url = process.argv[2];

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
            console.log('Cannot open the URL');
            process.exit();
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

    for (var i in images) {
        console.log(images[i]);


        // Download images
        //
        // result = await download(images[i], `image-${i}.png`);
        //
        // if (result === true) {
        //     console.log('Success:', images[i], 'has been downloaded successfully.');
        // } else {
        //     console.log('Error:', images[i], 'was not downloaded.');
        //     console.error(result);
        // }
    }

    await browser.close();
})();

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

const download = (url, destination) => new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    https.get(url, response => {
        response.pipe(file);

        file.on('finish', () => {
            file.close(resolve(true));
        });
    }).on('error', error => {
        fs.unlink(destination);

        reject(error.message);
    });
});