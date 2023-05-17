/* Handle all user CRUD operations for database */

const db = require('../helpers/database');
const bcrypt = require('bcrypt');

//get a single user by their id
exports.getById = async function getById(id) {
	let query = "SELECT * FROM users WHERE ID = ?;";
	let values = [id];
	let data = await db.run_query(query, values);
	return data;
}


//get a single user by the (unique) username
exports.getByUsername = async function getByUsername(username) {
    let query = "SELECT * FROM users WHERE username = ?;";
    let user = await db.run_query(query, username);
    return user;
}


  //list all the users in the database
exports.getAll = async function getAll (page, limit, order) {
    let query = "SELECT * FROM users;";
    let data = await db.run_query(query);
    return data;
}


//create a new user in the database
exports.add = async function add (user) {
    let query = "INSERT INTO users SET ?";
    let password = user.password;
    let hash = bcrypt.hashSync(password, 10); // hash password using bcrypt encryption
    user.password = hash;
    let data = await db.run_query(query, user);
    return data;
}


//delete a user by its id
exports.delById = async function delById (id) {
    let query = "DELETE FROM users WHERE ID = ?;";
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
}

  
//update an existing user
exports.update = async function update (user) {
    let query = "UPDATE users SET ? WHERE ID = ?;";
    if (user.password) {
      let password = user.password;
      let hash = bcrypt.hashSync(password, 10);
      user.password = hash;  
    }
    let values = [user, user.ID];
    let data = await db.run_query(query, values);
    return data;
}