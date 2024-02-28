const userRepository = require('./user-repository');

async function createUser(username, password, email) {

    return await userRepository.createUser(username, password, email);
}

module.exports = { createUser };