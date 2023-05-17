/* Handle all reviews CRUD operations for database */

const db = require('../helpers/database');

//list all the reviews in the database
exports.getAll = async function getAll (page, limit, order) {
	let query = "SELECT * FROM reviews;";
	let data = await db.run_query(query);
	return data; 
}


//get single review by review ID
exports.getById = async function getById(id) {
	let query = "SELECT * FROM reviews WHERE ID = ?;";
	let values = [id];
	let data = await db.run_query(query, values);
	return data;
}


// get all reviews by productID
exports.getByProductId = async function getByProductId(id) {
	let query = "SELECT * FROM reviews WHERE productID = ?;";
	let values = [id];
	let data = await db.run_query(query, values);
	return data;
}

//count reviews in article
exports.count = async function count (id) {
	let query = "SELECT COUNT(*) as review_count FROM reviews WHERE productID = ?;"; 
	const result = await db.run_query(query, [id]);
	return result[0].review_count;
}

//count reviews in article
exports.rating = async function rating (id) {
	let query = "SELECT AVG(rating) as avg_rating FROM reviews WHERE productID = ?;"; 
	const result = await db.run_query(query, [id]);
	return result[0].avg_rating;
}

//get reviews from specific user by their ID
exports.getByUserId = async function getByUserId(id) {
	let query = "SELECT * FROM reviews WHERE userID = ?;";
	let values = [id];
	let data = await db.run_query(query, values);
	return data;
}


//get reviews from specific user by their username
exports.getByUsername = async function getByUsername(username) {
    let query = "SELECT * FROM reviews WHERE username = ?;";
    let user = await db.run_query(query, username);
    return user;
}


//create a new review in the database
exports.add = async function add(review) { 
	let query = "INSERT INTO reviews SET ?;";
	let data = await db.run_query(query, review); 
	return data;
}


// update review in database
exports.update = async function update(review) {
	let query = "UPDATE reviews SET ? WHERE ID = ?;";
	let values = [review, review.ID];
	let data = await db.run_query(query, values);
	return data;
}


// delete review in database
exports.delById = async function delById(id) {
	let query = "DELETE FROM reviews WHERE ID = ?;";
	let values = [id];
	let data = await db.run_query(query, values)
	return data;
}