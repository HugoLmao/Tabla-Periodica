const db = require('../models/index')
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const element = db.element;
const group = db.group;

exports.createGroup = async(req, res) =>{
    try {
        const { body } = req;

        if(!body.name) return res.status(404).send({message:'name es requerido'});
        if(!body.number) return res.status(404).send({message:'number es requerido'});
        

        const create = await group.create({
            name: body.name,
            number: body.number,
        });

        return res.status(201).send({message:'Grupo creado correctamente.'})
    } catch (error) {
        return res.status(500).send(message.error)
    }
};

exports.getGroups = async(req, res) =>{
    try {
        const { groupName } = req.query;

        if(groupName){
            const find = await group.findAll({
                where: {
                    statusDelete: false,
                },
                    include:{
                        model: element
                    }, 
            })
            return res.status(200).send(find);
        };


        const find = await group.findAll({
            where: { statusDelete: false},
            include: {
                model: element
            },
        });
        
        return res.status(200).send(find)

    }   catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getGroupById = async(req, res) =>{
    try {
        const { id }=req.params;

        const find = await group.findByPk(id,{
            include:{
                model: element
            },
        });
        if(!find)
            return res.status(404).send({message:'No se encontro el grupo'});
        if(find.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el grupo'});
        
        return res.status(200).send(find)

    }   catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updateGroup = async (req, res) => {
    try {
        const { body, params } = req;

        if(!body)return res.status(400).send({message:'Los datos son requeridos para actualizar'});
        if(!body.name) return res.status(404).send({message:'name es requerido'});
        if(!body.number) return res.status(404).send({message:'number es requerido'});

        const validate = await group.findOne({
            where:{ id: params.id },
        });
        
        if(!validate) 
            return res.status(404).send({message:'No se encontro el grupo'});
        if(validate.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el grupo'});

        validate.name = body.name;   
        validate.number = body.number;   
        validate.save();

        return res.status(200).send({message:'Tu grupo se actualizo correctamente'})
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.deleteGroup = async(req, res) =>{
    try {
        const { id }=req.params;

        const find = await group.findByPk(id);

        if(!find)
            return res.status(404).send({message:'No se encontro el grupo'});
        if(find.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el grupo'});

        find.statusDelete = true;
        find.save();

        return res.status(200).send({message:'Grupo eliminado correctamente'});

    } catch (error) {
        return res.status(500).send(message.error);
    }
};