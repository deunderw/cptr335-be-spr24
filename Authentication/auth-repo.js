const nano = require('nano')(`http://${process.env.DBUSER}:${process.env.DBPASS}@localhost:5984`);
const db = nano.db.use(`${process.env.DBNAME}`);

const authenticateUser = async (username, password) => {
    try {
        // Query the database for the user with the provided username and password
        const result = await db.find({
            selector: {
                "email": { "$eq": username },
                "password": { "$eq": password }
            },
            limit: 1 // Limit to one result (assuming username and password are unique)
        });

        // Check if a user matching the criteria was found
        if (result.docs.length > 0) {
            const user = result.docs[0];

            // Return the user data
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                clientId: user.clientId
                // Include other fields as needed
            };
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