const app = require('../server');
const request = require('supertest');

describe('Testing accept incoming URL',()=>{
    const url = 'https://www.google.co.il';

    test('Test recive url', async ()=>{
        const response = await request(app).post('/').send({
            'url' : url
        });
        expect(response.statusCode).toEqual(200);
    });
});

describe('Testing retrieve stored URLs list',()=>{

    test('Test retrieve stored URLs list', async ()=>{
        const response = await request(app).get('/');
        expect(response.statusCode).toEqual(200);
    });
});

describe('Testing getHtmlByUrl',()=>{

    test('Test sucsses at getHtmlByUrl', async ()=>{
        const response = await request(app).get('/getHtmlByUrl/?url=https://www.google.co.il');
        expect(response.statusCode).toEqual(200);
    });
});

describe('Testing getHtmlByUrl without URL parameter',()=>{

    test('Test empty URL query parameter', async ()=>{
        const response = await request(app).get('/getHtmlByUrl');
        expect(response.statusCode).toEqual(204);
    });
});

describe('Testing getHtmlByUrl with URL parameter that not at the DB',()=>{

    test('Test not found at getHtmlByUrl', async ()=>{
        const response = await request(app).get('/getHtmlByUrl/?url=https://www.noWebsiteExample.co.il');
        expect(response.statusCode).toEqual(404);
    });
});