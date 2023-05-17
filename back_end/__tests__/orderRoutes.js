/* Testing suite for order routes. */
// run tests via npm test or npm run test:watch

const request = require('supertest') 
const app = require('../app')

// Test creation of new order
describe('Post new order', () => {   
    it('should create a new order', async () => {     
        const res = await request(app.callback())       
            .post('/myKorea/orders')
            .auth('surajmannn', '123')       
            .send({ 
                "productID" : 2,
                "userID" : 1,
                "username" : "TEST ORDER",
                "quantity" : 2,
                "productPrice" : 2.50,
                "totalPrice" : 5.00
            })     
        expect(res.statusCode).toEqual(201)     
        expect(res.body).toHaveProperty('created', true)   
    }) 
});

// Test new order was created. Also test get order by ID
describe('Check Created New order', () => {   
    it('Should return 200', async () => {     
        const res = await request(app.callback())
            // above created order will always be at ID=7       
            .get('/myKorea/orders/7')
            .auth('surajmannn', '123')
            .send();   
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('ID')  
    }) 
}); 

//Test order update
describe('Should update order at ID 7 made in prior tests', () => {   
    it('Should return 200 if update works', async () => {     
        const res = await request(app.callback())       
            .put('/myKorea/orders/7')
            .auth('surajmannn','123')
            .send({ 
                "productID" : 2,
                "userID" : 1,
                "username" : "TEST ORDER",
                "quantity" : 5,
                "productPrice" : 2.50,
                "totalPrice" : 12.50
            });   
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('updated', true)  
    }) 
});

//Test deleting an order - from user - PERMISSIONS
describe('Should delete order created in first test at ID 7', () => {   
    it('Should return 403 as role-user cannot delete product', async () => {     
        const res = await request(app.callback())       
            .del('/myKorea/orders/7')
            .auth('test4','123')
            .send();   
        expect(res.statusCode).toEqual(403)  
    }) 
});

//Test deleting order
describe('Should delete order created in first test at ID 7', () => {   
    it('Should return 200, and response', async () => {     
        const res = await request(app.callback())       
            .del('/myKorea/orders/7')
            .auth('surajmannn','123')
            .send();   
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('deleted', true)  
    }) 
});

//Test getting all orders
describe('Get all request', () => {   
    it('Should return 200', async () => {     
        const res = await request(app.callback())    
            .get('/myKorea/products')
            .auth('surajmannn', '123')
            .send();   
        expect(res.statusCode).toEqual(200)
    }) 
});

// Test authenitaction
describe('Get all orders', () => {   
    it('Should return 401 due to no authentication', async () => {     
        const res = await request(app.callback())    
            .get('/myKorea/orders')
            .send();   
        expect(res.statusCode).toEqual(401)
    }) 
});

// Test validation
describe('Should update order at ID 7 made in prior tests', () => {   
    it('Should return error message due to bad data', async () => {     
        const res = await request(app.callback())       
            .put('/myKorea/orders/7')
            .auth('surajmannn','123')
            .send({ 
                "productID" : "7",
                "userID" : 1,
                "username" : "TEST ORDER",
                "quantity" : 5,
                "productPrice" : 2.50,
                "totalPrice" : 12.50
            });   
        expect(res.statusCode).toEqual(400)
        expect(res.body.message).toMatch('is not of a type(s) integer')  
    }) 
});