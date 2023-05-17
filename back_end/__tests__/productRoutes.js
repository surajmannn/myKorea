/* Testing suite for product routes. */
// run tests via npm test or npm run test:watch

const request = require('supertest') 
const app = require('../app')

// Test creation of new user
describe('Post new product', () => {   
    it('should create a new product', async () => {     
        const res = await request(app.callback())       
            .post('/myKorea/products')
            .auth('surajmannn', '123')       
            .send({ 
                title: 'Dummy Product', 
                description: 'Dummy product', 
                productPrice: 1.49,
                categoryID: 1
            })     
        expect(res.statusCode).toEqual(201)     
        expect(res.body).toHaveProperty('created', true)   
    }) 
});

// Test new product was created. Also test get product by ID
describe('Check Created New product (ID=7)', () => {   
    it('Should return 200', async () => {     
        const res = await request(app.callback())
            // above created product will always be at ID=8       
            .get('/myKorea/products/7')
            .send();   
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('ID')  
    }) 
}); 

//Test product update
describe('Should update product at ID 7 made in prior tests', () => {   
    it('Should return 200 if update works', async () => {     
        const res = await request(app.callback())       
            .put('/myKorea/products/7')
            .auth('surajmannn','123')
            .send({ 
                title: 'modified'
            });   
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('updated', true)  
    }) 
});

//Test deleting a product - from user - PERMISSIONS
describe('Should delete product created in first test at ID 7', () => {   
    it('Should return 403 as role-user cannot delete product', async () => {     
        const res = await request(app.callback())       
            .del('/myKorea/products/7')
            .auth('test4','123')
            .send();   
        expect(res.statusCode).toEqual(403)  
    }) 
});

//Test deleting a product
describe('Should delete user created in first test at ID 7', () => {   
    it('Should return 200, and response', async () => {     
        const res = await request(app.callback())       
            .del('/myKorea/products/7')
            .auth('surajmannn','123')
            .send();   
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('deleted', true)  
    }) 
});

//Test getting all products
describe('Get all request', () => {   
    it('Should return 200', async () => {     
        const res = await request(app.callback())    
            .get('/myKorea/products')
            .send();   
        expect(res.statusCode).toEqual(200)
    }) 
});

//Test get reviews for specified product
describe('Get all request', () => {   
    it('Should return 201', async () => {     
        const res = await request(app.callback())    
            .get('/myKorea/products/2/reviews')
            .send();   
        expect(res.statusCode).toEqual(201)
    }) 
});

// Test authenitaction
describe('Get product views count', () => {   
    it('Should return 401 due to no authentication', async () => {     
        const res = await request(app.callback())    
            .get('/myKorea/products/views/1')
            .send();   
        expect(res.statusCode).toEqual(401)
    }) 
});

// Test validation
describe('Should update product at ID 7 made in prior tests', () => {   
    it('Should return error message due to bad data', async () => {     
        const res = await request(app.callback())       
            .put('/myKorea/products/7')
            .auth('surajmannn','123')
            .send({ 
                productPrice: "7"
            });   
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toMatch('is not of a type(s) number')  
    }) 
});