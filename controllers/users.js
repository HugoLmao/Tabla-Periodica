const db = require('../models/index')
const Sequelize = require("sequelize")
const Op = Sequelize.Op
const bcrypt = require('bcryptjs')

const userAddress = db.userAddress
const user = db.user


exports.createUser = async(req, res) =>{
    try {
        const { body } = req;

        if(!body.name) return res.status(404).send({message:'name es requerido'});
        if(!body.lastName) return res.status(404).send({message:'lastName es requerido'});
        if(!body.email) return res.status(404).send({message:'email es requerido'});
        if(!body.password) return res.status(404).send({message:'password es requerido'});

        if(!body.userAddressId) return res.status(404).send({message:'userAddress es requerido'});
        
        const findUserAddress = await userAddress.findOne({
            where:{
                id: body.userAddressId,
                statusDelete: false,
            }
        });
        const findRepeatedEmail = await user.findOne({
            where: {
                email: body.email,
                statusDelete: false,
            }
        });

        if (findRepeatedEmail)
            return res.status(409).send({message:'Email ya en uso.'})
        if (findRepeatedEmail === false)
            return res.status(200).next()

        let encriptedPassword = bcrypt.hashSync(body.password, 10)

        if(!findUserAddress)return res.status(404).send({message: 'userAddress no encontrado' })

        const create = await user.create({
            name: body.name,
            lastName: body.lastName,
            email: body.email,
            password: encriptedPassword,
            userAddressId: body.userAddressId
        });

        return res.status(201).send({message:'usuario creado correctamente.'})
    } catch (error) {
        return res.status(500).send(message.error)
    }
};

exports.getUsers = async(req, res) =>{
    try {

        const find = await user.findAll({
            where: { 
                statusDelete: false
                },
        });
        
        return res.status(200).send(find)

    }   catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getUsersById = async(req, res) =>{
    try {
        const { id }=req.params;

        const find = await user.findByPk(id);
        if(!find)
            return res.status(404).send({message:'No se encontro el usuario'});
        if(find.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el usuario'});
        
        return res.status(200).send(find)

    }   catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { body, params } = req;

        if(!body.name) return res.status(404).send({message:'name es requerido'});
        if(!body.lastName) return res.status(404).send({message:'lastName es requerido'});
        if(!body.email) return res.status(404).send({message:'email es requerido'});
        if(!body.password) return res.status(404).send({message:'password es requerido'});
        if(!body.userAddressId) return res.status(404).send({message:'userAddressId es requerido'});

        const findRepeatedEmail = await user.findOne({
            where: {
                email: body.email,
                statusDelete: false,
            }
        });

        if (findRepeatedEmail)
            return res.status(409).send({message:'Email ya en uso.'})
        if (findRepeatedEmail === false)
            return res.status(200).next()

        const validate = await user.findOne({
            where:{ id: params.id },
        });
        
        if(!validate) 
            return res.status(404).send({message:'No se encontro el usuario'});
        if(validate.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el usuario'});

        validate.name = body.name;   
        validate.lastName = body.lastName;   
        validate.email = body.email;   
        validate.password = body.password;   
        validate.userAddressId = body.userAddressId;   
        validate.save();

        return res.status(200).send({message:'Tu usuario se actualizo correctamente'})
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.deleteUser = async(req, res) =>{
    try {
        const { id }=req.params;

        const find = await user.findByPk(id);

        if(!find)
            return res.status(404).send({message:'No se encontro el usuario'});
        if(find.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el usuario'});

        find.statusDelete = true;
        find.save();

        return res.status(200).send({message:'Usuario eliminado correctamente'});

    } catch (error) {
        return res.status(500).send(message.error);
    }
};