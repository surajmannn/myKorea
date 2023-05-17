/* Handle all product view count CRUD operations for database */

const db = require('../helpers/database');

//add a new view record (done every time a product is viewed)
exports.add = async function add (id) {
    let query = "INSERT INTO views SET productID=?; ";
    await db.run_query(query, [id]);
}
  
//count the views for a single product
exports.count = async function count (id) {
    let query = "SELECT count(1) as views FROM views WHERE productID=?;";
    const result = await db.run_query(query, [id]);
    return result;
}