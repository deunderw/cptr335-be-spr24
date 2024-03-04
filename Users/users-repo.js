const nano = require('nano')(process.env.DBURL);
const db = nano.db.use(process.env.DBNAME);
const { v4: uuidv4 } = require('uuid');

async function createUser(firstName, lastName, email, password) {
    const userId = uuidv4();
    
    const newUser = {
        _id: userId,
        firstName,
        lastName,
        email,
        password,
        balance: 1000000,
    };

    const response = await db.insert(newUser);
    console.log('response', response);

    return { id: userId, ...newUser };
}

const getById = async (id) => {
    return {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        clientId: '1'
    };    
}

module.exports = { createUser, getById };