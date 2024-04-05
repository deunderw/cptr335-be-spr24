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

app.get("/be/getUserData",
    async (req, res, next) => {
   try {
        const userID = req.session.id;

        if (!userID) {
            // If the user ID is not found in the session, the user is not logged in
            return res.status(401).json({ error: 'Unauthorized' });
        }

        res.send({
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            email: req.session.user.email
        })
    } catch (error) {
            // If an error occurs, handle it and send an error response
            console.error('Error fetching user data:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
});

app.post("/be/updateUser",
    async (req, res) => {
        try {
            const { firstName, lastName, email } = req.body;
            const userID = req.session.user.id;
            const updateUser = await userService.updateUser (userID, firstName, lastName, email);

            res.status(200).json(updateUser);
        } catch (error) {
            console.log('Error updating user data:', error);
            res.status(418).json({ error });
        }
    }
);

module.exports = app;