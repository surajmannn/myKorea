/* this file defines the API route handlers for Orders */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');  // adding request body parsing
const reviews = require('../models/reviews');
const orders = require('../models/orders');
const auth = require('../controllers/auth');
const {validateReview} = require('../controllers/validation');
const can = require('../permissions/reviews');

// products URI path
const router = Router({prefix: '/mykorea/reviews'});

router.get('/', getAll);
router.get('/:id([0-9]{1,})', auth, getById);
router.post('/', auth, bodyParser(), validateReview, createReview);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateReview, updateReview);
router.del('/:id([0-9]{1,})', auth, deleteReview);


// Reviews CRUD FUNCTIONS
// list all reviews
async function getAll(ctx) {
  let results = await reviews.getAll(); 
  if (results.length) {
    ctx.status = 200;
    ctx.body = results;
  }
}

// get review by its ID
async function getById(ctx) {
  const id = ctx.params.id;
  let review = await reviews.getById(id);  
  if (review.length) {
    data = review[0];
    const permissions = can.view(ctx.state.user, data);
    if (!permissions.granted) {
      ctx.sgttatus = 403;
    } else {
        ctx.status = 200;
        ctx.body = review;                
    }
  }
}

// get review by product ID. Used in products route only.
async function getByProductId(ctx) {
  const id = ctx.params.id;               
  let review = await reviews.getByProductId(id);  
  if (review.length) {  
    ctx.status = 201;
    ctx.body = review;                
  }
}

// create new review if order has been placed prior
async function createReview(ctx) {
  let id = ctx.state.user.ID;
  orderExists = await orders.getByUserId(id);   // Check user has made an order for product
  if (orderExists.length) {
    let body = ctx.request.body;
    let result = await reviews.add(body);
    if(result.affectedRows) {
      ctx.status = 201;
      ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
    }
  } else {
    ctx.status = 403;
  }
}

// update a review
async function updateReview(ctx) {
  const id = ctx.params.id;
  let result = await reviews.getById(id);
  if (result.length) {
    let review = result[0];
    const permission = can.update(ctx.state.user, review);
    if (!permission.granted) {
      ctx.status = 403;
    } else {
      const {ID, ...body} = ctx.request.body; // exclude field ID from overwrite
      Object.assign(review, body);
      result = await reviews.update(review);
      if (result.affectedRows) {
        ctx.status = 201;
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    }
  }
}

// delete a review
async function deleteReview(ctx) {
  const id = ctx.params.id;
  const permission = can.delete(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    let result = await reviews.delById(id);
    if (result.affectedRows) {
      ctx.status = 200;
      ctx.body = {ID: id, deleted: true}
    }
  }
}


// defining exporting object
module.exports = router;