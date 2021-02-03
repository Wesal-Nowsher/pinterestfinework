const puppeteer = require('puppeteer');

if (process.argv.length != 4) {
    console.log('Wrong arguments!');
    console.log('Example: node screenshot.js https://google.com logo.png');
    process.exit();
}

(async () => {
    const url = process.argv[2];
    const logoname = process.argv[3];

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

    let classes = [
        'img.logo',
        'svg.logo',
        '.logo img',
        '.logo svg',
        '#logo img',
        '#logo svg',
        'img#logo',
        'svg#logo',
        '.header__logo img',
        '.header__logo svg',
        '.navbar-brand',
        '.nav-brand',
        '.logo',
        '#logo',
        "[class*='logo'] img",
        "[class*='Logo'] img",
        "[class*='logo'] svg",
        "[class*='Logo'] svg",
        "img[class*='logo']",
        "img[class*='Logo']",
        "svg[class*='logo']",
        "svg[class*='Logo']",
        "[class*='logo']",
        "[class*='Logo']"
    ];

    let logoElement;

    for (let i in classes) {
        logoElement = await page.$(classes[i]);

        if (logoElement && await logoElement.isIntersectingViewport()) {
            break;
        }
    }

    if (logoElement) {
        try {
            await logoElement.screenshot({path: logoname});
        } catch (e) {

        }
    }

    await browser.close();
})();