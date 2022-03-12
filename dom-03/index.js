const express = require('express');
const users = require('./handlers/users');

const api = express();

api.use(express.json());

api.get('/api/users', users.getAll);
api.get('/api/users/:id', users.getOne);
api.post('/api/users', users.create);
api.put('/api/users/:id', users.update);
api.patch('/api/users/:id', users.updatePartial);
api.delete('/api/users/:id', users.remove);

api.listen(5050, err => { 
    if(err) 
    return console.log(err);
    return console.log('Server started in port 5050')
});
