const repo = require('./users-repo.js');

async function createUser(firstName, lastName, email, password) {
    const emailInUse = await repo.isEmailInUse(email);

    if (emailInUse) {
        throw new Error('Email is already in use');
    }

    return await repo.createUser(firstName, lastName, email, password);
}

const getById = async (id) => {
    return await repo.getById(id);
}

module.exports = { createUser, getById };