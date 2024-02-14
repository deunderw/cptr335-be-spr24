const repo = require('./auth-repo.js');

const authenticateUser = async (username, password) => {
    return await repo.authenticateUser(username, password);
}

module.exports = {
    authenticateUser,
}