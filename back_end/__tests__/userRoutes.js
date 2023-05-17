/* Testing suite for User routes. */
// run tests via npm test or npm run test:watch

const request = require('supertest') 
const app = require('../app')

// Test creation of new user
describe('Post new user', () => {   
    it('should create a new user', async () => {     
        const res = await request(app.callback())       
            .post('/myKorea/users')       
            .send({ 
                username: 'unique_112233', 
                password: 'password', 
                email: 'unique_email@example.com'
            })     
        expect(res.statusCode).toEqual(201)     
        expect(res.body).toHaveProperty('created', true)   
    }) 
}); 

// Test new user was created
describe('Check Created New user Test', () => {   
    it('should validate the user above by their username', async () => {     
        const res = await request(app.callback())       
            .get('/myKorea/users/unique_112233')
            .auth('unique_112233','password')
            .send();   
        expect(res.statusCode).toEqual(200)  
    }) 
}); 

// Test get for retrieving user by their ID
describe('Check returned user by their ID', () => {   
    it('should validate user with 200 status', async () => {     
        const res = await request(app.callback())       
            .get('/myKorea/users/1')
            .auth('surajmannn','123')
            .send();   
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('username');   
    }) 
});

// Test Authentication
describe('Check authentication check', () => {   
    it('should fail as no authentication with 401', async () => {     
        const res = await request(app.callback())       
            .get('/myKorea/users/8')
            .send();   
        expect(res.statusCode).toEqual(401)  
    }) 
});

//Test user update
describe('Should update user at ID 2 ', () => {   
    it('Should return 200 if update works', async () => {     
        const res = await request(app.callback())       
            .put('/myKorea/users/2')
            .auth('surajmannn','123')
            .send({ 
                firstName: 'modified'
            });   
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('updated', true)  
    }) 
});

//Test deleting a user - from user
describe('Should delete user at ID 2', () => {   
    it('Should return 401 as no permission due to missing authorisation', async () => {     
        const res = await request(app.callback())       
            .del('/myKorea/users/2')
            .send();   
        expect(res.statusCode).toEqual(401)  
    }) 
});

//Test deleting a user 
describe('Should delete user created in first test at ID 8', () => {   
    it('Should return 404 as user ID cannot be found', async () => {     
        const res = await request(app.callback())       
            .del('/myKorea/users/8')
            .auth('surajmannn','123')
            .send();   
        expect(res.statusCode).toEqual(404)  
    }) 
});

// Test recieving users orders
describe('Check returned orders for user', () => {   
    it('should return with 200 status', async () => {     
        const res = await request(app.callback())       
            .get('/myKorea/users/1/orders')
            .auth('surajmannn','123')
            .send();   
        expect(res.statusCode).toEqual(200)  
    }) 
});

// Test Permissions - Only admin can access this request
describe('Send get all request on users from user role account', () => {   
    it('should return with 403 status', async () => {     
        const res = await request(app.callback())       
            .get('/myKorea/users')
            .auth('test4','123')
            .send();   
        expect(res.statusCode).toEqual(403)  
    }) 
});

// Test Validations
describe('Post new user, bad data', () => {   
    it('should return error message based on invalid email', async () => {     
        const res = await request(app.callback())       
            .post('/myKorea/users')       
            .send({ 
                username: 'user1', 
                password: 'password', 
                email: 1
            })     
        expect(res.statusCode).toEqual(400)     
        expect(res.body.message).toMatch('is not of a type(s) string')   
    }) 
});