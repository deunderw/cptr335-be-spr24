const nano = require('nano')(`${process.env.DBURL}`);
const db = nano.db.use(`${process.env.DBNAME}`);

const authenticateUser = async (username) => {
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

            return {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                id: user.id
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