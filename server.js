const express = require('express');
const getScreenshot = require('./modules/website-screenshot');
const extractzip = require('./modules/extractzip');
const getLogo = require('./modules/website-logo');
const getImages = require('./modules/website-images');
const cors = require('cors')
const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/extractzip', (req, res) => {

    console.log("url coning", req.body)
    extractzip(req.body.url).then((files) => {
        console.log("files",files)
        res.send({
            files: files
        });
    }).catch((error) => {
        res.status(500).send({
            error: error
        });
    });
});
app.post('/api/website/screenshot', (req, res) => {
    if (!req.body.url || req.body.url.indexOf('http') !== 0) {
        return res.status(400).send({
            error: 'Website URL is required.'
        });
    }

    getScreenshot(req.body.url).then((image) => {
        res.send({
            image: image
        });
    }).catch((error) => {
        res.status(500).send({
            error: error
        });
    });
});
app.get('/api/website/screenshot1', (req, res) => {
    res.send("money")

});
app.get('/', (req, res) => {
    res.send("money ok")

});

app.post('/api/website/logo', (req, res) => {
    if (!req.body.url || req.body.url.indexOf('http') !== 0) {
        return res.status(400).send({
            error: 'Website URL is required.'
        });
    }

    getLogo(req.body.url).then((image) => {
        res.send({
            logo: image
        });
    }).catch((error) => {
        res.status(500).send({
            error: error
        });
    });
});

app.post('/api/website/images', (req, res) => {
    if (!req.body.url || req.body.url.indexOf('http') !== 0) {
        return res.status(400).send({
            error: 'Website URL is required.'
        });
    }

    getImages(req.body.url).then((images) => {
        res.send({
            images: images
        });
    }).catch((error) => {
        res.status(500).send({
            error: error
        });
    });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);