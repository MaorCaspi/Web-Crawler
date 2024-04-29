const dotenv = require('dotenv').config();
const Crawler = require('crawler');

const crawler = new Crawler({
  maxConnections: process.env.MAX_CRAWLER_CONECTIONS,
  skipDuplicates: true, // Skips URIs that were already crawled, without even calling callback()
  
  callback: async (error, res, done) => { // This will be called for each crawled page
      if (error) {
          console.error(error);
      } else {
          const $ = res.$;
          const url = res.options.uri.toLowerCase();

          const UrlController = require('./controllers/urls');

          try { 
            // Check if it the URL address is already at the database
            const exists = await UrlController.searchUrlInDB(url);

            if (!exists) {
                const html = $('html');
                await UrlController.createNewUrlInDB(url, html);
            }
            else {
                console.log(`URL ${url} was already in the database.`);
            }
        }
        catch (err) {
            console.error(`Error processing URL ${url}: ${err.message}`);
        }
        // Get all links that found at the html page
        const links = $("a")
        .map((i, link) => link.attribs.href)
        .get()
        .filter(link => link.startsWith("http"));

        crawler.queue(links); // Enter all the links that found into the queue's crawler
      }
      done();
  }
});

module.exports = {
    crawler
};