const dotenv = require('dotenv').config();
const Crawler = require('crawler');
const Url = require('./models/url_model');

const crawler = new Crawler({
  maxConnections: process.env.MAX_CRAWLER_CONECTIONS,
  skipDuplicates: true, //skips URIs that were already crawled, without even calling callback()
  // This will be called for each crawled page
  callback: async (error, res, done) => {
      if (error) {
          console.log(error);
      } else {
          const $ = res.$;
          const url = res.options.uri.toLowerCase();
         try {
            const exists = await Url.findOne({'url' : url});
            if (exists == null) {
                const html = $('html');
                // Save the crawled URL to the database
                try {
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
                console.log(`URL ${url} is already in the database.`);
            }
        }
        catch (err) {
            console.error(`Error with check if the URL ${url} is in the database: ${err.message}`);
        }
        
        const links = $("a")
        .map((i, link) => link.attribs.href)
        .get()
        .filter(link => link.startsWith("http"));

        crawler.queue(links);

      }
      done();
  }
});

module.exports = {
    crawler
};