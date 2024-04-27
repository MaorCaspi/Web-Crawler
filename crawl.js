const fetch = require('node-fetch');
const cheerio = require('cheerio');
const urlParser = require('url');

const seenUrls = {};

const getUrl = (link, host, protocol) => {
  if (link.startsWith("http")) {
    return link;
  } else if (link.startsWith("/")) {
    return `${protocol}//${host}${link}`;
  } else {
    return `${protocol}//${host}/${link}`;
  }
};

const crawl = async ({ url }) => {
  if (seenUrls[url]) return;
  console.log("crawling", url);
  seenUrls[url] = true;

  const { host, protocol } = urlParser.parse(url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const html = await response.text();
    //console.log(html);
    const $ = cheerio.load(html);
    const links = $("a")
      .map((i, link) => link.attribs.href)
      .get();

    links
      .forEach((link) => {
        crawl({
         url: getUrl(link, host, protocol)
        });
      });
    }
  catch (error) {
    console.error(`Error while crawling the site: ${url}, the action failed with the following error:\n\n`, error);
  }
};

crawl({
  url: "https://www.google.co.il"
});