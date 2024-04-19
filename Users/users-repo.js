const nano = require('nano')(process.env.DBURL);
const db = nano.db.use(process.env.DBNAME);
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function isEmailInUse(email) {
  const result = await db.find({
    selector: {
      email: {
        $eq: email.toLowerCase(),
      },
    },
  });

  return result.docs.length > 0;
}

async function createUser(firstName, lastName, email, password) {
  const emailInUse = await isEmailInUse(email);

  if (emailInUse) {
    throw new Error('Email is already in use');
  }

  const id = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    balance: 1000000,
    portfolio: [],
  };

  const response = await db.insert(newUser);
  console.log('response', response);

  return { id, ...newUser };
}

async function updateUser(userID, firstName, lastName, email) {
  try {
    const existingDoc = await db.find({
      selector: {
        id: {
          $eq: userID,
        },
      },
    });

    existingDoc.docs[0].firstName = firstName;
    existingDoc.docs[0].lastName = lastName;
    existingDoc.docs[0].email = email;

    const response = await db.insert(
      existingDoc.docs[0],
      existingDoc.docs[0]._id
    );

    return { response };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

const getById = async (id) => {
  return new Promise(async resolve => {
    const result = await db.find({
      selector: {
        id: {
          $eq: id,
        },
      },
    });
  
    if (result.docs.length !== 1) {
      throw new Error('User not found!');
    }
    const user = result.docs[0];
    resolve({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      balance: user.balance,
      portfolio: user.portfolio,
    });
    })
};

const updatePortfolio = async (id, data) => {
  return new Promise(async (resolve, revoke) => {
    let result = await db.find({
      selector: {
        id: {
          $eq: id,
        },
      },
    });
    result.docs[0].balance = data.balance;
    result.docs[0].portfolio = data.portfolio;
  
    try {
      await db.insert(result.docs[[0]]);
      resolve({ newBalance: data.balance, newPortfolio: data.portfolio });
    } catch (err) {
      revoke({ error: 'Portfolio update failed', errorMessage: err });
    }
  })
};

module.exports = {
  isEmailInUse,
  createUser,
  updateUser,
  getById,
  updatePortfolio,
};
