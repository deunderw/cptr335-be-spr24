/* const repo = require('./auth-repo.js');

const authenticateUser = async (username, password) => {
    return await repo.authenticateUser(username, password);
}

module.exports = {
    authenticateUser,
} */

// ------------------------------------------------------------
// Authentication/auth-service
// This is what you currently have so no changes needed
const repo = require('./auth-repo.js');
const authenticateUser = async (username, password) => {
    return await repo.authenticateUser(username, password);
}
module.exports = {
    authenticateUser,
}