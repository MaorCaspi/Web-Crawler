const Url = require('../models/url_model');
const {crawler} = require('../crawler');

// Retrieve stored URLs list
const getUrls = async (req, res) => {
    try {
        const urls = await Url.find( {}, {"_id":0, "__v":0, "htmlContent":0});
        if(urls.length === 0){
            res.status(204).send("There are no URLs in the database");
        }
        else{
            res.status(200).send(urls);
        }
    }
    catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        });
    }
};

// Get HTML by URL address
const getDataByUrl = async (req, res) => {
    try {
        const url = req.query.url;
        if(url == null){
            res.status(204).send(); //No Content, URL query parameter is empty
        }
        else {
            result = await Url.findOne( {"url" : url}, {"__v":0});
            if(!result){
                res.status(404).send("No such URL found");
            }
            else{
                res.status(200).send(result);
            }
        }
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

// Accept incoming URL and trigger the fetching, parsing, and storage process
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
    getDataByUrl,
    processUrl
};