/* Testing suite for review routes. */
// run tests via npm test or npm run test:watch

const request = require('supertest') 
const app = require('../app')

// Test creation of new review
describe('Post new review', () => {   
    it('should create a new review', async () => {     
        const res = await request(app.callback())       
            .post('/myKorea/reviews')
            .auth('surajmannn', '123')       
            .send({ 
                "productID" : 2,
                "review" : "TEST",
                "rating" : 5,
                "userID" : 2,
                "username" : "TEST",
            })     
        expect(res.statusCode).toEqual(201)     
        expect(res.body).toHaveProperty('created', true)   
    }) 
});

// Test new review was created. Also test get order by ID
describe('Check Created New review', () => {   
    it('Should return 200', async () => {     
        const res = await request(app.callback())
            // above created order will always be at ID=11      
            .get('/myKorea/reviews/11')
            .auth('surajmannn', '123')
            .send();   
        expect(res.statusCode).toEqual(200)
    }) 
}); 

//Test review update
describe('Should update review at ID 11 made in prior tests', () => {   
    it('Should return 200 if update works', async () => {     
        const res = await request(app.callback())       
            .put('/myKorea/reviews/11')
            .auth('surajmannn','123')
            .send({ 
                "productID" : 1,
                "review" : "TEST",
                "rating" : 3,
                "userID" : 1,
                "username" : "TEST",
            });   
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('updated', true)  
    }) 
});

//Test deleting a review - from user - PERMISSIONS
describe('Should delete review created in first test at ID 11', () => {   
    it('Should return 403 as role-user cannot delete product', async () => {     
        const res = await request(app.callback())       
            .del('/myKorea/reviews/11')
            .auth('test4','123')
            .send();   
        expect(res.statusCode).toEqual(403)  
    }) 
});

//Test deleting review
describe('Should delete review created in first test at ID 11', () => {   
    it('Should return 200, and response', async () => {     
        const res = await request(app.callback())       
            .del('/myKorea/reviews/11')
            .auth('surajmannn','123')
            .send();   
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('deleted', true)  
    }) 
});

//Test getting all reviews
describe('Get all request', () => {   
    it('Should return 200', async () => {     
        const res = await request(app.callback())    
            .get('/myKorea/reviews')
            .auth('surajmannn', '123')
            .send();   
        expect(res.statusCode).toEqual(200)
    }) 
});

// Test authenitaction
describe('Get review 11', () => {   
    it('Should return 401 due to no authentication', async () => {     
        const res = await request(app.callback())    
            .get('/myKorea/reviews/11')
            .send();   
        expect(res.statusCode).toEqual(401)
    }) 
});

// Test validation
describe('Should update order at ID 11 made in prior tests', () => {   
    it('Should return error message due to bad data', async () => {     
        const res = await request(app.callback())       
            .put('/myKorea/reviews/11')
            .auth('surajmannn','123')
            .send({ 
                "productID" : "1",
                "review" : "TEST",
                "rating" : 3,
                "userID" : 1,
                "username" : "TEST",
            });   
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toMatch('is not of a type(s) integer')  
    }) 
});