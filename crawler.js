const dotenv = require('dotenv').config();
const Crawler = require('crawler');

const crawler = new Crawler({
  maxConnections: process.env.MAX_CRAWLER_CONECTIONS,
  // This will be called for each crawled page
  callback: (error, res, done) => {
      if (error) {
          console.log(error);
      } else {
          const $ = res.$;
          const url = res.options.uri;
          const title = $('title').text();
          const html = $('html').text();

          const links = $("a")
          .map((i, link) => link.attribs.href)
          .get()
          .filter(link => link.startsWith("http"));
          console.log(links);

          crawler.queue(links);

      }
      done();
  }
});

module.exports = {
    crawler
};