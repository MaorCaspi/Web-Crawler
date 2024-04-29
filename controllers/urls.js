const Url = require('../models/url_model');
const {crawler} = require('../crawler');
const axios = require('axios');

// Retrieve stored URLs list
const getUrls = async (req, res) => {
    try {
        const urls = await Url.find( {}, {"_id":0, "__v":0, "htmlContent":0}); // Get all URLs
        if(urls.length === 0){
            res.status(204).send("There are no URLs in the database");
            return;
        }

        res.status(200).send(urls); // Sucsses
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
        if(url == null) { //No Content, URL query parameter not found
            res.status(204).send();
        }
        else {
            result = await Url.findOne( {"url" : url}, {"__v":0});
            if(!result){
                res.status(404).send("No such URL found");
                return;
            }

            res.status(200).send(result); // Sucsses
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
        if(url == null) { //No Content, URL body parameter not found
            res.status(204).send();
            return;
        }

        // Check if the URL is reachable by making an HTTP request
        try {
            const response = await axios.head(url);
            if (response.status !== 200) {
                res.status(400).send(`Failed to reach URL: ${url} , the response status was ${response.status}`);
                return;
            }
        }
        catch{
            res.status(400).send(`Failed to reach URL: ${url} , it's unavailable`);
            return;
        }


        // Sucsses
        crawler.queue(url); //Queue the URL for crawling
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