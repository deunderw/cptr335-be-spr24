// Users/users-service
// This is what you currently have so no changes needed
const repo = require('./users-repo.js');
const user = async (id) => {
    return await repo.getById(id);
}
module.exports = {
    getById,
}