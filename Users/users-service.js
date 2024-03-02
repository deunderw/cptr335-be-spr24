const repo = require('./users-repo.js');

async function createUser(username, password, email) {

    return await repo.createUser(username, password, email);
}

const getById = async (id) => {
    return await repo.getById(id);
}

module.exports = { createUser, getById };