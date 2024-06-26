const app = require('../server');
const request = require('supertest');
const Url = require('../models/url_model');

beforeAll(async () => {
    await Url.deleteMany({});
});

afterAll(async () => {
    await Url.deleteMany({});
});

describe('Testing accept incoming URL',()=>{
    const url = 'https://www.google.co.il';

    test('Test recive url', async ()=>{
        const response = await request(app).post('/').send({
            'url' : url
        });
        expect(response.statusCode).toEqual(200);
    });

    test('Check if database is not empty after 6 seconds', async () => {
        // Wait for 6 seconds (6000 milliseconds)
        await new Promise(resolve => setTimeout(resolve, 6000));

        // Check if database is not empty
        const urls = await Url.find({});
        expect(urls.length).toBeGreaterThan(0);
    }, 100000);
});

describe('Testing accept incoming URL with missing url',()=>{

    test('Test recive url with missing url', async ()=>{
        const response = await request(app).post('/').send({
        });
        expect(response.statusCode).toEqual(204);
    });
});

describe('Testing accept incoming URL with site not exist',()=>{
    const url = 'https://www.noWebsiteExample.co.il';

    test('Test recive url with site not exist', async ()=>{
        const response = await request(app).post('/').send({
            'url' : url
        });
        expect(response.statusCode).toEqual(400);
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