/* this file defines the API route handlers or Products */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');  // adding request body parsing
const products = require('../models/products');
const productViews = require('../models/productViews'); // path to product views functionality
const productReviews = require('../models/reviews');
const auth = require('../controllers/auth');
const {validateProduct, validateProductUpdate} = require('../controllers/validation');
const can = require('../permissions/products');

// products URI path
const prefix = '/myKorea/products';
const router = Router({prefix: prefix});

router.get('/', getAll);
router.post('/', auth, bodyParser(), validateProduct, createProduct); 
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateProductUpdate, updateProduct);
router.del('/:id([0-9]{1,})', auth, deleteProduct);

// product views requests
router.get('/views/:id([0-9]{1,})', auth, getViewCount);

// product reviews
router.get('/:id([0-9]{1,})/reviews', getProductReviews);

// Product reviews count
router.get('/:id([0-9]{1,})/reviews/count', getReviewsCount);

// Product rating average
router.get('/:id([0-9]{1,})/reviews/rating', getReviewsRating);


// Get all products including HATEOAS links
async function getAll(ctx) {
  let results = await products.getAll(); 
  if (results.length) {
    const body = results.map(product => {
      const {ID, title, description, imageURL, productPrice, categoryID} = product;
      const links = {
        reviewsCount: `https://${ctx.host}${prefix}/${product.ID}/reviews/count`, // manually adding https: 
        reviewsRating: `https://${ctx.host}${prefix}/${product.ID}/reviews/rating`, // manually adding https: 
        self: `${ctx.protocol}://${ctx.host}${prefix}/${product.ID}`
      }
      return {ID, title, description, imageURL, productPrice, categoryID, links};
    });

    ctx.status = 200;
    ctx.body = body;
  }
}

// Get product via its ID
async function getById(ctx) {
  // Get ID from route parameters
  const id = ctx.params.id;                 // Get ID
  let product = await products.getById(id);  // Get product of corresponding ID
  if (product.length) {                   // If product present
    await productViews.add(id);           // Add product view to productViews table
    ctx.status = 200;
    ctx.body = product[0];                // Body = current product
  }
}

// add a product
async function createProduct(ctx) {
  const permission = can.add(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    let body = ctx.request.body;
    let result = await products.add(body);
    if(result.affectedRows) {
      const id = result.insertId;
      ctx.status = 201;
      ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
    }
  }
}

// update a product
async function updateProduct(ctx) {
  const permission = can.update(ctx.state.user);
  if (!permission.granted){
    ctx.status = 403;
  } else {
    const id = ctx.params.id;
    let result = await products.getById(id);
    if (result.length) {
      let product = result[0];
      const {ID, ...body} = ctx.request.body; // exclude field ID from overwrite
      Object.assign(product, body);
      result = await products.update(product);
      if (result.affectedRows) {
        ctx.status = 201;
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    }
  }
}

// delete a product 
async function deleteProduct(ctx) {
  const permission = can.delete(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const id = ctx.params.id;
    let result = await products.delById(id);
    if (result.affectedRows) {
      ctx.status = 200;
      ctx.body = {ID: id, deleted: true}
    }
  }
}


// VIEWS CRUD FUNCTIONS
// get product views count
async function getViewCount(ctx) {
  const permission = can.read(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const id = ctx.params.id;
    let result = await productViews.count(id);
    if (result.length) {
      ctx.status = 201;
      ctx.body = {ID: id, views: result[0].views};
    }
  }
}


// REVIEWS CRUD FUNCTIONS
// get product reviews by product id
async function getProductReviews(ctx) {
  const id = ctx.params.id;
  let reviews = await productReviews.getByProductId(id);
  if (reviews.length) {
    ctx.status = 201;
    ctx.body = reviews;
  }
}

// get number of reviews for a given product
async function getReviewsCount(ctx) {
  const id = ctx.params.id;
  const result = await productReviews.count(id);  
  ctx.body = result ? result : 0;
  ctx.status = 200;
}

// get average rating for a given product
async function getReviewsRating(ctx) {
  const id = ctx.params.id;
  const result = await productReviews.rating(id);  
  ctx.body = result ? result : 0;
  ctx.status = 200;
}


// defining exporting object
module.exports = router;