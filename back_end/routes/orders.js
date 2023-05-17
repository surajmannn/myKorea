/* this file defines the API route handlers for Orders */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');  // adding request body parsing
const orders = require('../models/orders');
const auth = require('../controllers/auth');
const {validateOrder} = require('../controllers/validation');
const can = require('../permissions/orders');

// products URI path
const router = Router({prefix: '/mykorea/orders'});

router.get('/', auth, getAll);
router.get('/:id([0-9]{1,})', auth, getById);
router.post('/', auth, bodyParser(), validateOrder, createOrder);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateOrder, updateOrder);
router.del('/:id([0-9]{1,})', auth, deleteOrder);


// ORDERS CRUD FUNCTIONS
// list all orders
async function getAll(ctx) {
  const permission = can.viewALL(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    let results = await orders.getAll(); 
    if (results.length) {
      ctx.status = 200;
      ctx.body = results;
    }
  }
}

// get order by ID - only for admin. Users can view by ID via users route
async function getById(ctx) {
  const permission = can.viewALL(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const id = ctx.params.id;               
    let order = await orders.getById(id);  
    if (order.length) {  
      ctx.status = 200;
      ctx.body = order[0];                
    }
  }
}

// create new order
async function createOrder(ctx) {
  let body = ctx.request.body;
  let result = await orders.add(body);
  if(result.affectedRows) {
    const id = result.insertId;
    ctx.status = 201;
    ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
  }
}

// update an order
async function updateOrder(ctx) {
  const permission = can.update(ctx.state.user);
  if (!permission.granted) {
    ctx.status = 403;
  } else {
    const id = ctx.params.id;
    let result = await orders.getById(id);
    if (result.length) {
      let order = result[0];
      const {ID, ...body} = ctx.request.body; // exclude field ID from overwrite
      Object.assign(order, body);
      result = await orders.update(order);
      if (result.affectedRows) {
        ctx.status = 201;
        ctx.body = {ID: id, updated: true, link: ctx.request.path};
      }
    }
  }
}

// delete an order
async function deleteOrder(ctx) {
  const permissions = can.delete(ctx.state.user);
  if (!permissions.granted) {
    ctx.status = 403;
  } else {
    const id = ctx.params.id;
    let result = await orders.delById(id);
    if (result.affectedRows) {
      ctx.status = 200;
      ctx.body = {ID: id, deleted: true}
    }
  }
}


// defining exporting object
module.exports = router;