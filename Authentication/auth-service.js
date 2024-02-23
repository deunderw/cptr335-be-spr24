const repo = require('./auth-repo.js');

console.log("auth-service file"); // debug
const authenticateUser = async (username, password) => {
    return await repo.authenticateUser(username, password);
}

module.exports = {
    authenticateUser,
}