/* This file defines the API route handlers for users */

const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const users = require('../models/users');
const usersOrders = require('../models/orders');
const auth = require('../controllers/auth');
const {validateUser, validateUserUpdate} = require('../controllers/validation');
const can = require('../permissions/users');
const orderPermissions = require('../permissions/orders');


// products URI path]
const prefix = '/myKorea/users'
const router = Router({prefix: prefix});

router.get('/', auth, getAll);
router.post('/', bodyParser(), validateUser, createUser);
router.get('/:id([0-9]{1,})', auth, getById);
router.get('/:username', auth, getByUsername);
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateUserUpdate, updateUser);
router.del('/:id([0-9]{1,})', auth, deleteUser);
router.post('/login', auth, login);

// users orders requests
router.get('/:id([0-9]{1,})/orders', auth, getOrdersById);
router.get('/:username/orders', auth, getOrdersByUsername);

// Users CRUD Operations
// list all users
async function getAll(ctx) {
    const permission = can.readAll(ctx.state.user);
    if (!permission.granted) {
        ctx.status = 403;
    } else {
        let results = await users.getAll();
        if (results.length) {
            ctx.status = 200;
            ctx.body = results;
        }
    }
}

// get a user by their ID
async function getById(ctx) {
    const id = ctx.params.id;
    let user = await users.getById(id);
    if (user.length) {
        data = user[0];
        const permission = can.read(ctx.state.user, data);
        if (!permission.granted) {
            ctx.status = 403;
        } else {
            ctx.status = 200;
            ctx.body = permission.filter(data);
        }
    }
}

// get user by their username
async function getByUsername(ctx) {
    const username = ctx.params.username;
    let user = await users.getByUsername(username);
    if (user.length) {
        data = user[0];
        const permission = can.read(ctx.state.user, data);
        if (!permission.granted) {
            ctx.status = 403;
        } else {
            ctx.status = 200;
            ctx.body = permission.filter(data);
        }
    }
}

// login
async function login(ctx) {
    // return any details needed by the client
    const {ID, username, email, avatarURL} = ctx.state.user 
    const links = {
        self: `https://${ctx.host}${prefix}/${ID}`,
        orders: `https://${ctx.host}${prefix}/${ID}/orders`,

    } 
    ctx.body = {ID, username, email, avatarURL, links};
    ctx.status = 201;
}

// create new user in database
async function createUser(ctx) {
    const body = ctx.request.body;
    let result = await users.add(body);
    if (result.affectedRows) {
      const id = result.insertId;
      ctx.status = 201;
      ctx.body = {ID: id, created: true, link: `${ctx.request.path}/${id}`};
    }
}

// delete existing user
async function deleteUser(ctx) {
    const id = ctx.params.id;
    let result = await users.delById(id);
    if (result.length) {
      const data = result[0];
      const permission = can.delete(ctx.state.user, data);
      if (!permission.granted) {
          ctx.status = 403;
      } else {
            if (result.affectedRows) {
                ctx.status = 200;
                ctx.body = {ID: id, deleted: true}
            }
        }
    }
}

// update a users details
async function updateUser(ctx) {
    const id = ctx.params.id;
    let result = await users.getById(id);
    if (result.length) {
        let user = result[0];
        const {ID, ...body} = ctx.request.body; // exclude field ID from overwrite
        const permission = can.update(ctx.state.user, user);
        if (!permission.granted) {
            ctx.status = 403;
        } else {
            Object.assign(user, body);
            result = await users.update(user);
            if (result.affectedRows) {
                ctx.status = 200;
                ctx.body = {ID: id, updated: true, link: ctx.request.path};
            }
        }
    }
}


// USERS ORDERS CRUD FUNCTIONS
// Get users orders by their ID
async function getOrdersById(ctx) {
    const usersId = ctx.params.id;
    let orders = await usersOrders.getByUserId(usersId);
    if (orders.length) {
        data = orders[0];
        const permission = orderPermissions.view(ctx.state.user, data);
        if (!permission.granted) {
            ctx.status = 403;
        } else {
            ctx.status = 200;
            ctx.body = orders;
        }
    }
}

// Get users orders by their username
async function getOrdersByUsername(ctx) {
    const username = ctx.params.username;
    let orders = await usersOrders.getByUsername(username);
    if (orders.length) {
        data = orders[0];
        const permission = orderPermissions.view(ctx.state.user, data);
        if (!permission.granted) {
            ctx.status = 403;
        } else {
            ctx.status = 200;
            ctx.body = orders;
        }
    }
}


// defining exporting object
module.exports = router;