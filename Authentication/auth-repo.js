const nano = require('nano')(`http://${process.env.DBUSER}:${process.env.DBPASS}@localhost:5984`);
const db = nano.db.use(`${process.env.DBNAME}`);
const bcrypt = require('bcrypt');

const authenticateUser = async (username, password) => {
    try {
        // Query the database for the user with the provided username and password
        const result = await db.find({
            selector: {
                "email": { "$eq": username },
            },
            limit: 1 // Limit to one result (assuming username and password are unique)
        });

        // Check if a user matching the criteria was found
        if (result.docs.length > 0) {
            const user = result.docs[0];

            // Compare the provided password with the hashed password stored in the database
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                // Return the user data
                return {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    clientId: user.clientId
                    // Include other fields as needed
                };
            } else {
                // Password doesn't match
                return null;
            }
        } else {
            // No user found
            return null;
        }
    } catch (error) {
        console.error('Error fetching user by username and password:', error);
        throw error;
    }
};

module.exports = {
    authenticateUser,
}