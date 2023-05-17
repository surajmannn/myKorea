/* Handle all order CRUD operations for database */

const db = require('../helpers/database');

//list all the orders in the database
exports.getAll = async function getAll (page, limit, order) {
	let query = "SELECT * FROM orders;";
	let data = await db.run_query(query);
	return data; 
}


//get single order by order ID
exports.getById = async function getById(id) {
	let query = "SELECT * FROM orders WHERE ID = ?;";
	let values = [id];
	let data = await db.run_query(query, values);
	return data;
}


//get orders from specific user by their ID
exports.getByUserId = async function getByUserId(id) {
	let query = "SELECT * FROM orders WHERE userID = ?;";
	let values = [id];
	let data = await db.run_query(query, values);
	return data;
}


//get order from specific user by their username
exports.getByUsername = async function getByUsername(username) {
    let query = "SELECT * FROM orders WHERE username = ?;";
    let user = await db.run_query(query, username);
    return user;
}


//create a new order in the database
exports.add = async function add(order) { 
	let query = "INSERT INTO orders SET ?;";
	let data = await db.run_query(query, order); 
	return data;
}


// update product in database
exports.update = async function update(order) {
	let query = "UPDATE orders SET ? WHERE ID = ?;";
	let values = [order, order.ID];
	let data = await db.run_query(query, values);
	return data;
}


// delete product in database
exports.delById = async function delById(id) {
	let query = "DELETE FROM orders WHERE ID = ?;";
	let values = [id];
	let data = await db.run_query(query, values)
	return data;
}