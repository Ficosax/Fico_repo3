const users = require('../pkg/users');

const getAll = async (req, res) => {
    try {
        let us = await users.getAllUsers();
        return res.status(200).send(us);
    } catch (err) {
        console.log(err)
        return res.status(500).send('Internal Server Error!')
    }
};

const getOne = async (req, res) => {
    try {
        let us = await users.getOne(Number(req.body.id));
        return res.status(200).send(us);
    } catch(err) { console.log(err) 
        return res.status(500).send('Internal Server Error!') }
};

const create = async (req, res) => {
    try {
        await users.addUser(req.body);
        return res.status(201).send(req.body);
    } catch(err) {
        console.log(err)
        return res.status(500).send('Internal Server Error!')
    }
};

const update = async (req, res) => {
    try {
        await users.updateUser(Number(req.params.id), req.body);
        return res.status(200).send("")
    } catch(err) {
        console.log(err)
        return res.status(500).send('Internal Server ERR !')
    }
};

const updatePartial = async (req, res) => {
    try {
        await users.partialUpdateUser(Number(req.params.id), req.body);
        return res.status(202).send();
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error')
    }
};

const remove = async (req, res) => {
    try {
        await users.removeUser(Number(req.params.id), req.body);
        return res.status(204).send("")
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Errror')
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    updatePartial,
    remove
}