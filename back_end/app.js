// Ramen API index page

// Set up Application
const Koa = require('koa');
const app = new Koa();

const cors = require('@koa/cors');
app.use(cors());

/* ADDING OF APP OBJECTS */
const products = require('./routes/products.js');
const users = require('./routes/users');
const orders = require('./routes/orders');
const reviews = require('./routes/reviews');

app.use(products.routes());
app.use(users.routes());
app.use(orders.routes());
app.use(reviews.routes());

module.exports = app;