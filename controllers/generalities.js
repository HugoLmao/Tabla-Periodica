const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models/index');

const user = db.user;

const privateKey =  'j0jOnäkimÿoN4b0k3Nb35toan1më';
const { expireIn } = '1h';

exports.login = async(req, res)=>{
    try {
        const { body } = req;

        if(!body.email) return res.status(404).send({message:'Email es requerido'})
        if(!body.password) return res.status(404).send({message:'Password es requerida'})
            
        const findUser = await user.findOne({
            where:{
                email: body.email,
                statusDelete: false,
            },
        });

        if(!findUser)return res.status(404).send({message:'No existe el usuario'})

        if(!bcrypt.compareSync(body.password, findUser.password))
            return res.status(400).send({message:'Credenciales invalidas'});

        const response = {
            id:findUser.id,
            name: findUser.name,
            lastName: findUser.lastName
        };
        let token = jwt.sign({
            user: response
        }, 
        privateKey,
        expireIn
        );

        return res.status(200).send({
            community: response,
            token,
        });

        } catch (error) {
          return res.status(500).send(error.message)  
    }
};