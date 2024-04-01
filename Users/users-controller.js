const express = require('express');
const userService = require('./users-service');

const app = express();

app.use(express.json());

app.post('/be/createUser',
    async (req, res) => {
        try {
            const { firstName, lastName, email, password } = req.body;

            const newUser = await userService.createUser(firstName, lastName, email, password);

            console.log('New User', newUser);

            res.status(201).json(newUser);
        } catch (error) {
            if (error.message === 'Email is already in use') {
                res.status(400).json({ error: 'Email is already in use' });
            
            } else {
                console.error('Error creating user:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        }
    }
);

app.post("/be/getUserData",
    async (req, res, next) => {
   try {
        const userID = req.session.id;

        if (!userID) {
            // If the user ID is not found in the session, the user is not logged in
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const user = await userService.getById(userID);

        if (!user) {
            // If the user is not found, return an error
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('<<<<<<<< user =', user);
        res.json({ status: 200, user });
    } catch (error) {
            // If an error occurs, handle it and send an error response
            console.error('Error fetching user data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
});

module.exports = app;