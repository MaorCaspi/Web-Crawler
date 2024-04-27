const express = require('express');
const router = express.Router();

const Url = require('../controllers/urls');

/**
* @swagger
* tags:
*   name: Url Api
*/

/**
* @swagger
* /:
*   get:
*     summary: Retrieve stored URLs and their associated raw HTML content
*     tags: [Url Api]
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Url'
*       400:
*         description: An error has occurred
*/
router.get('/', Url.getUrls);

/**
* @swagger
* /:
*   post:
*     summary: Accept incoming URL and trigger the fetching, parsing, and storage process
*     tags: [Url Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             properties:
*                url:
*                  type: string
*             required:
*               - url
*           example:
*              url: 'https://www.google.co.il'
*     responses:
*       200:
*         description: URL processing triggered successfully
*       400:
*         description: An error has occurred
*/
router.post('/', Url.processUrl);

module.exports = router;