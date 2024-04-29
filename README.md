# Web Crawler

Scalable backend system designed to collect and manage unique URLs and find their corresponding sub-URL links in a recursive process.<br/>
The system stores the unique URLs and their corresponding raw HTML content and can handle multiple requests at the same time.<br/>
Furthermore, with a focus on efficiency, the system checks whether a URL address has already been crawled and skips it if so.

## System Architecture:

- Node.js environment with Express library for receiving HTTP requests.<br/>
- MongoDB for storing all the data.<br/>
- [Node-Crawler](https://www.npmjs.com/package/crawler) library for the crawling (include cash memory build-in).<br/>
- Jest for automation tests.<br/>
- Swager documentation.

![Diagram](system%20design/system%20design.png)

## API Endpoints:

The project has Swager documentation with all the API endpoints and examples,<br/>
run the project, open the browser, and get to http://localhost:3000/api-docs.<br/>
There are 3 API endpoints:

1. **POST / :**
   - **Description:** Accept incoming URL and trigger the fetching, parsing, and storage process.
   - **Request Body:** 
     ```json
     {
       "url": "some website address"
     }
     ```

2. **GET / :**
   - **Description:** Retrieve stored URLs list.


3. **GET /getHtmlByUrl?url=some website address :**
   - **Description:** Get stored HTML by URL address.

## Get started
Clone the repository:
```sh
git clone https://github.com/MaorCaspi/Web-Crawler.git
```
Then, Install all the required packages:
```sh
npm install
```
For starting up, type:
```sh
npm start
```
