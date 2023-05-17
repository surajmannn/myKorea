/* Handle all product CRUD operations for database */

const db = require('../helpers/database');

//get a single product by its id
exports.getById = async function getById(id) {
	let query = "SELECT * FROM products WHERE ID = ?;";
	let values = [id];
	let data = await db.run_query(query, values);
	return data;
}


//list all the products in the database
exports.getAll = async function getAll (page, limit, order) {
	let query = "SELECT * FROM products;";
	let data = await db.run_query(query);
	return data; }


//create a new product in the database
exports.add = async function add(product) { 
	let query = "INSERT INTO products SET ?;";
	let data = await db.run_query(query, product); 
	return data;
}


// update product in database
exports.update = async function update(product) {
	let query = "UPDATE products SET ? WHERE ID = ?;";
	let values = [product, product.ID];
	let data = await db.run_query(query, values);
	return data;
}


// delete product in database
exports.delById = async function delById(id) {
	let query = "DELETE FROM products WHERE ID = ?;";
	let values = [id];
	let data = await db.run_query(query, values)
	return data;
}