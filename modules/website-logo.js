const puppeteer = require('puppeteer');

async function getLogo(url) {
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

    let image = '';

    if (logoElement) {
        image = await logoElement.screenshot({ encoding: "base64" });
    } else {
        throw 'Cannot find a logo.';
    }

    await browser.close();

    return image;
}

module.exports = getLogo;

