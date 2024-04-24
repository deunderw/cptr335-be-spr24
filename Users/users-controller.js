const express = require('express');
const userService = require('./users-service');

const app = express();

app.use(express.json());

app.post('/be/createUser', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = await userService.createUser(
      firstName,
      lastName,
      email,
      password
    );

    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === 'Email is already in use') {
      res.status(400).json({ error: 'Email is already in use' });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.get('/be/getUserData', async (req, res) => {
  try {
    const userID = req.session.user.id;

    if (!userID) {
      // If the user ID is not found in the session, the user is not logged in
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await userService.getById(userID);

    res.send({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      balance: user.balance,
      portfolio: user.portfolio
    });
  } catch (error) {
    // If an error occurs, handle it and send an error response
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/be/updateUser', async (req, res) => {
  try {
    const { firstName, lastName, email, formEmail } = req.body;
    const userID = req.session.user.id;
    const updateUserResponse = await userService.updateUser(
      userID,
      firstName,
      lastName,
      email,
      formEmail
    );
    const user = await userService.getById(userID);
    req.session.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    res.status(200).json(updateUserResponse);
  } catch (error) {
    console.log('Error updating user data:', error);
    res.status(418).json({ error });
  }
});

module.exports = app;
