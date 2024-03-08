const repo = require('./auth-repo.js');
const bcrypt = require('bcrypt');

const authenticateUser = async (username, password) => {
    const userData =  await repo.authenticateUser(username);
    console.log('<<<<< userData = ', userData);

    if(userData != null) {
        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (passwordMatch) {
            // Return the user data
            return {
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                clientId: userData.clientId
                // Include other fields as needed
            };
        } else {
            // Password doesn't match
            return null;
        }
    } else {
        return null;
    }
}

module.exports = {
    authenticateUser,
}