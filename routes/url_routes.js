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
*         - html
*       properties:
*         _id:
*           type: ObjectId
*           description: Id
*         url:
*           type: string
*           description: The url address 
*         html:
*           type: string
*           description: The raw HTML content
*       example:
*         _id: '662d7059666caba8eee8e598'
*         url: 'https://www.google.co.il'
*         html: '<html lang="en"> <a href="https://example.com">Visit Example.com</a> </html>'
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