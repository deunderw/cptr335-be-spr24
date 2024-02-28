const express = require('express');
const userService = require('./user-service');

const app = express();

app.use(express.json());

app.post('/be/user',
    async (req, res) => {
        try {
            const { username, password, email } = req.body;

            const newUser = await userService.createUser(username, password, email);

            res.status(201).json(newUser);
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
);

module.exports = app;