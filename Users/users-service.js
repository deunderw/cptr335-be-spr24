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

async function updateUser(userID, firstName, lastName, email, formEmail) {
    if(email != formEmail) {
        const emailInUse = await repo.isEmailInUse(email);
        if(emailInUse) {
            throw new Error('Email is already in use!');
        }else {
            return await repo.updateUser(userID, firstName, lastName, email);
        }
    }else {
        const updateResult = await repo.updateUser(userID, firstName, lastName, email);
        if (updateResult) {
            return { success: true };
        } else {
            throw new Error('Failed to update user!');
        }
    }
};

module.exports = { createUser, getById, updateUser };