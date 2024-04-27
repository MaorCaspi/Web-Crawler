const {crawler} = require('../crawler');

const getUrls = async (req, res) => {
    try {
        res.status(200).send('hello!');
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
        url = req.body.url;
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