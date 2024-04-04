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
        if(req.body.firstName != req.body.formFirstName) {
            console.log('First names unequal');
        }
        if(req.body.lastName != req.body.formLastName) {
            console.log('Last names unequal');
        }
        if(req.body.email != req.body.formEmail) {
            console.log('Emails unequal');
        }
        return res.status(200);
    }
);

module.exports = app;