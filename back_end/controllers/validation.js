/* Handle validation of requests against JSON Schema for model functionality */

/**
* A module to run JSON Schema based validation on request/response data. 
* @module controllers/validation
* @author Suraj Mann
* @see schemas/* for JSON Schema definition files
*/

const {Validator, ValidationError} = require('jsonschema');

const productSchema = require('../schemas/products.json').definitions.product;
const productUpdateSchema = require('../schemas/products.json').definitions.productUpdated;
const orderSchema = require('../schemas/orders.json').definitions.order;
const reviewSchema = require('../schemas/reviews.json').definitions.review;
const userSchema = require('../schemas/users.json').definitions.user;
const userUpdateSchema = require('../schemas/users.json').definitions.userUpdate;

/**
* Wrapper that returns a Koa middleware validator for a given schema.
* @param {object} schema - The JSON schema definition of the resource
* @param {string} resource - The name of the resource e.g. 'product'
* @returns {function} - A Koa middleware handler taking (ctx, next) params 
*/
const makeKoaValidator = (schema, resource) => {

  const v = new Validator();
  const validationOptions = {
    throwError: true,
    propertyName: resource
  };

    /**
   * Koa middleware handler function to do validation
   * @param {object} ctx - The Koa request/response context object
   * @param {function} next - The Koa next callback
   * @throws {ValidationError} a jsonschema library exception
   */
  const handler = async (ctx, next) => {

    const body = ctx.request.body;

    try {
      v.validate(body, schema, validationOptions);
      await next();
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error);
        ctx.status = 400; 
        ctx.body = error;     
      } else {
        throw error;
      }
    }
  }
  return handler;
}

/** Validate data against product schema */
exports.validateProduct = makeKoaValidator(productSchema, 'products');
exports.validateProductUpdate = makeKoaValidator(productUpdateSchema, 'productUpdate');
/** Validate data against order schema */
exports.validateOrder = makeKoaValidator(orderSchema, 'orders');
/** Validate data against user schema */
exports.validateUser = makeKoaValidator(userSchema, 'user');
exports.validateUserUpdate = makeKoaValidator(userUpdateSchema, 'userUpdate');
/** Validate data against review schema */
exports.validateReview = makeKoaValidator(reviewSchema, 'review');