const puppeteer = require('puppeteer');

if (process.argv.length != 3) {
    console.log('Wrong arguments!');
    console.log('Example: node get-youtube-image.js https://www.youtube.com/watch?v=BdcG8wZ0qhA');
    process.exit();
}

(async () => {
    const url = process.argv[2];

    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
        }
    });

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

    const title = await page.evaluate(() => {
        let title = document.title;
        return title.substr(0, title.indexOf(' - YouTube'));
    });

    let videoId = '';

    if (url.indexOf('youtu.be') > 1) {
        videoId = url.replace(/\/$/, "").split('/').pop();
    } else {
        videoId = url.replace(/\/$/, "").split('watch?v=').pop();
    }

    console.log(title);
    console.log(`http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`);

    await browser.close();
})();