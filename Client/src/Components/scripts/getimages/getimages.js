const axios = require('axios');

if (process.argv.length != 4 || (/^\d+$/.test(process.argv[3]) == false)) {
    console.log('Wrong arguments!');
    console.log('Example: node getimages.js "birds" 50');
    process.exit();
}

if (parseInt(process.argv[3]) > 200) {
    console.log('Wrong argument! Maximum number of images is 200');
    process.exit();
}

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '18941967-b3ff5678d564def1b9b6bf0c6';
const QUERIES = process.argv[2].split(',');
const COUNT = parseInt(process.argv[3]) > 3 ? parseInt(process.argv[3]) : 3;

(async() => {
    try {
        const responses = await Promise.all(QUERIES.map(query => {
            return axios.get(`${API_URL}?key=${API_KEY}&q=${query}&per_page=${COUNT}`);
        }));

        responses.forEach(response => {
            if (parseInt(response.data.totalHits) > 0) {
                if (parseInt(process.argv[3]) >= 3) {
                    response.data.hits.forEach(element => console.log(element.largeImageURL));
                } else {
                    for (let i = 0; i < parseInt(process.argv[3]); i++) {
                        console.log(response.data.hits[i].largeImageURL);
                    }
                }
            }
            else {
                console.log(`No images for "${query}" query`);
            }
        });
    } catch (error) {
        console.log(error);
    }
})();
