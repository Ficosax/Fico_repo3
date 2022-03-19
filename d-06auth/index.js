const config = require('./pkg/config');
require('./pkg/db');

const express = require('express');
const auth = require('./handlers/auth')

const api = express();

api.use(express.json());

api.post('/api/v1/auth/login', auth.login);
api.post('/api/v1/auth/register', auth.register);
api.get('/api/v1/auth/refresh-token', auth.refreshToken);
api.post('/api/v1/auth/forgot-password', auth.forgotPassword);
api.post('/api/v1/auth/reset-password', auth.resetPassword);

api.listen(config.get('service').port, err => {
    if(err) return console.log(err);
    console.log(`Server started on port ${config.get('service').port}`);
});
