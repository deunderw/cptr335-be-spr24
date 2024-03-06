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
            console.log('Error creating user:', error);
            res.status(401).json({ error: error });
        }
    }
);

module.exports = app;