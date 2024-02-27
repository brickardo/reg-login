const User = require("./models/User");
const Role = require("./models/Role");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {validationResult} = require('express-validator');

class authController {
    async registration(req, res){
        try {

            const error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(400).json({message: "Ошибка твоего головчатого ластика"});
            }

            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if(candidate){
               return res.status(400).json({message: "Пользовательно с таким именем уже существуем"}); 
            }

            const hashPassword = bcrypt.hashSync(password, 6);
            const userRole = await Role.findOne({value: "user"});
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save();
            return res.json({message: "Пользователь зарегестрирован"});

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req, res){
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});

            if(!user){
                return res.status(400).json({message: "Пользователля с таким именем не найдено"}); 
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                return res.status(400).json({message: "Пароль - залупа "}); 
            }
            
            res.status(200).json({message: "Ты залогинился"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }

    async getUsers(req, res){
        try {
            res.json("Server is working");
        } catch (e) {
            console.log(e);
        }
    }
};

module.exports = new authController();