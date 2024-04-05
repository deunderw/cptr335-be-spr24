const nano = require('nano')(process.env.DBURL);
const db = nano.db.use(process.env.DBNAME);
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function isEmailInUse(email) {
    const result = await db.find({
        selector: {
            email: {
                "$eq": email.toLowerCase()
            }
        }
    });

    return result.docs.length > 0;
}

async function createUser(firstName, lastName, email, password) {
    const emailInUse = await isEmailInUse(email);

    if (emailInUse) {
        throw new Error('Email is already in use');
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = {
        id: userId,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        balance: 1000000,
    };

    const response = await db.insert(newUser);
    console.log('response', response);

    return { id: userId, ...newUser };
}

async function updateUser(userID, firstName, lastName, email) {
    try {
        const existingDoc = await db.find({
            selector: {
                id: {
                    "$eq": userID
                }
            }
        });

        existingDoc.docs[0].firstName = firstName;
        existingDoc.docs[0].lastName = lastName;
        existingDoc.docs[0].email = email;

        const response = await db.insert(existingDoc.docs[0], existingDoc.docs[0]._id);

        console.log('Response from db.insert:', response);

        return { response };
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

const getById = async (id) => {
    const result = await db.find({
        selector: {
            id: {
                "$eq": id
            }
        }
    });

    if (result.docs.length == 0) {
        return {};
    }
    const user = result.docs[0];
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        id: user.id
        // Include other fields as needed
    };
}

module.exports = { isEmailInUse, createUser, updateUser, getById };