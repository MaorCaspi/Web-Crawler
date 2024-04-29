const dotenv = require('dotenv').config();
const Crawler = require('crawler');
const Url = require('./models/url_model');

const crawler = new Crawler({
  maxConnections: process.env.MAX_CRAWLER_CONECTIONS,
  skipDuplicates: true, // Skips URIs that were already crawled, without even calling callback()
  
  callback: async (error, res, done) => { // This will be called for each crawled page
      if (error) {
          console.error(error);
      } else {
          const $ = res.$;
          const url = res.options.uri.toLowerCase();
         try { // Check if it the URL address is already at the database
            const exists = await Url.findOne({'url' : url}, {"_id":0, "__v":0, "htmlContent":0});
            if (exists == null) { // if not already exist at the database
                const html = $('html');

                try { // Save the crawled URL to the database
                    await Url.create({
                        url: url,
                        htmlContent: html
                    });
                    console.log(`URL ${url} saved to the database.`);
                }
                catch (err) {
                    console.error(`Error saving URL ${url} to the database: ${err.message}`);
                }
            }
            else {
                console.log(`URL ${url} was already at the database.`);
            }
        }
        catch (err) {
            console.error(`Error with check if the URL ${url} is in the database: ${err.message}`);
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