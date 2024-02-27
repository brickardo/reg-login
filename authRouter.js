const Router = require('express');
const rout = new Router();
const controller = require('./authController')
const {check} = require('express-validator');

rout.post('/registration',
[check('username', "Имя Не может быть пустым").notEmpty(),
check('password', "4 or 10 max").isLength(4, 10)
],
 controller.registration);
rout.post('/login', controller.login);
rout.get('/users', controller.getUsers);


module.exports = rout;