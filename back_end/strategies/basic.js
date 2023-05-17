// Basic Authentication

const BasicStrategy = require('passport-http').BasicStrategy; 
const users = require('../models/users');
const bcrypt = require('bcrypt');

const verifyPassword = function (user, password) {    
    // compare user.password with the password supplied
    const isMatch = bcrypt.compareSync(password, user.password);
    return isMatch; 
}

const checkUserAndPass = async (username, password, done) => {
    // look up the user and check the password if the user exists
    // call done() with either an error or the user, depending on outcome let result;
    let result;

    try {
        result = await users.getByUsername(username);
    } catch (error) {
        console.error(`Error during authentication for user ${username}`); 
        return done(error);
    }
    if (result.length) {
        const user = result[0];
        if (verifyPassword(user, password)) {
            console.log(`Successfully authenticated user ${username}`);
            return done(null, user); 
        } else {
            console.log(`Password incorrect for user ${username}`); 
        }
    } else {
        console.log(`No user found with username ${username}`);
    }
    return done(null, false); // username or password were incorrect 
}

// Function for getting encrypted password for test data
const encrypt = function(password) {
    hashed = bcrypt.hashSync(password, 10);
    return hashed;
}

const strategy = new BasicStrategy(checkUserAndPass); 
module.exports = strategy;