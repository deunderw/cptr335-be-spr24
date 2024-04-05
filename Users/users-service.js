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

async function updateUser(userID, firstName, lastName, email) {
    const emailInUse = await repo.isEmailInUse(email);

    if(emailInUse) {
        throw new Error('Email is already in use');
    } else {
        return await repo.updateUser(userID, firstName, lastName, email);
    };
}

module.exports = { createUser, getById, updateUser };