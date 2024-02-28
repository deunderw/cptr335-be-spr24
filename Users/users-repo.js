const nano = require('nano')('http://${process.env.DBUSER}:${process.env.DBPASS}@localhost:5984');
const db = nano.db.use('users');
const { v4: uuidv4 } = require('uuid');

async function createUser(username, password, email) {
    const userId = uuidv4();
    
    const newUser = {
        _id: userId,
        firstname,
        lastname,
        email,
        password,
        balance: 1000000,
    };

    const response = await db.insert(newUser);

    return { id: userId, ...newUser };
}

module.exports = { createUser };