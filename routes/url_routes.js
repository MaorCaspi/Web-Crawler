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
* components:
*   schemas:
*     Url:
*       type: object
*       required:
*         - _id
*         - url
*         - htmlContent
*       properties:
*         _id:
*           type: ObjectId
*           description: Id
*         url:
*           type: string
*           description: The url address 
*         htmlContent:
*           type: string
*           description: The raw HTML content
*       example:
*         _id: '662d7059666caba8eee8e598'
*         url: 'https://www.google.co.il'
*         htmlContent: '<html lang="en"> <a href="https://example.com">Visit Example.com</a> </html>'
*/

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve stored URLs list
 *     tags: [Url Api]
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *             example:
 *               - url: 'https://www.google.co.il'
 *               - url: 'https://www.youtube.com'
 *               - url: 'https://mail.google.com'
  *       204:
 *         description: There are no URLs in the database
 *       400:
 *         description: An error has occurred
 */
router.get('/', Url.getUrls);

/**
* @swagger
* /getHtmlByUrl:
*   get:
*     summary: Get HTML by URL address
*     tags: [Url Api]
*     parameters:
*       - in: query
*         name: url
*         schema:
*           type: string
*         required: true
*         description: The URL address
*     responses:
*       200:
*         description: Success
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Url'
*       204:
*         description: URL query parameter is empty
*       404:
*         description: There is no such URL at the DB
*       400:
*         description: Error
*/
router.get('/getHtmlByUrl', Url.getDataByUrl)

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