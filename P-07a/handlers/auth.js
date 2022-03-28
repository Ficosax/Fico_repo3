const {
    validate,
    AccountLogin,
    Account
} = require('../pkg/account/validate');

const account = require('../pkg/account/index');
const config = require('../pkg/config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        await validate(req.body, AccountLogin);
        let acc = account.getByEmail(req.body.email);
        if(!acc) {
            throw {
                code: 404,
                error: 'Account not found'
            };
        }
        if(!bcrypt.compareSync(req.body.password, acc.password)) {
            throw {
                code: 400,
                error: 'Wrong password'
            };
        }
        let payload = {
            full_name: acc.full_name,
            email: acc.email,
            id: acc._id,
            exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60
        };
        let token = jwt.sign(payload, config.get('service').jwt_key);
        return res.status(200).send({token});
    } catch(err) {
        console.log(err);
        return res.status(err.code).send(err.error);
    }
};

const register = async (req, res) => {
    try {
        await validate(req.body, Account);
        let exists = account.getByEmail(req.body.email);
        if(exists) {
            throw {
                code: 400,
                error: 'Account exists'
            };
        }
        req.body.password = bcrypt.hashSync(req.body.password);
        let acc = account.create(req.body);
        return res.status(201).send(acc);
    } catch(err) {
        console.log(err);
        return res.status(err.code).send(err.error);
    }
};

const refreshToken = async (req, res) => {
    let payload = {
        ...req.user,
        exp: new Date().getTime() / 1000 + 7 * 24 * 60 * 60
    };
    let token = jwt.sign(payload, config.get('service').jwt_key);
    return res.send({token});
};

// const forgotPassword = async (req, res) => {
//     return res.status('Ok');
// };

// const resetPassword = async (req, res) => {
//     return res.status('ok');
// };

module.exports = {
    login,
    register,
    refreshToken
}