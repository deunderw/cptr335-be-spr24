// Users/users-repo
// Once again this is for testing.  We would need to hook this up to the db
// later but right now we will just stub it would with static data
const getById = async (id) => {
    return 
        {
            firstName = 'John',
            lastName = 'Doe',
            email = 'john@example.com',
            clientId = '1'
        };    
}
module.exports = {
   getById,
}