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
};

async function updateUser(userID, firstName, lastName, email, formEmail) {
  const emailInUse = await repo.isEmailInUse(email);
  if (email != formEmail && emailInUse) {
    throw new Error('Email is already in use!');
  }

  const updateResult = await repo.updateUser(
    userID,
    firstName,
    lastName,
    email
  );
  if (!updateResult) {
    throw new Error('Failed to update user!');
  }
  return updateResult;
}

module.exports = { createUser, getById, updateUser };
