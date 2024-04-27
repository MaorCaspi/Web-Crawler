const mongoose = require("mongoose");

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

const urlSchema = new mongoose.Schema({
    url: { // URL address
        type: String,
        required: true,
        unique: true,
        index: true
    },
    htmlContent: { // Raw HTML content
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Url', urlSchema);