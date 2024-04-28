const Url = require('../models/url_model');
const {crawler} = require('../crawler');

const getUrls = async (req, res) => {
    try {
        const urls = await Url.find( {}, {"_id":0, "__v":0, "htmlContent":0});
        res.status(200).send(urls);
    }
    catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        });
    }
};

const processUrl = async (req, res) => {
    try {
        const url = req.body.url;
        crawler.queue(url);
        res.status(200).send('URL processing triggered successfully for the URL: ' + url);
    }
    catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        });
    }
};

module.exports = {
    getUrls,
    processUrl
};