const express = require('express');
const service = require('./auth-service');

const app = (module.exports = express());

app.post('/be/client',
    async (req, res) => {
        try {
            const username = req.body.username;
            const password = req.body.password;

            const isValid = await service.authenticateUser(username, password);

            if (isValid) {
                res.status(200).send({ status: 200 });
            } else {
                res.send(400).send({ status: 400 });
            }
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
        }
    }
);