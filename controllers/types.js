const db = require('../models/index')
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const type = db.type
const name = type.name

exports.createType = async(req, res) =>{
    try {
        const { body } = req;

        if(!body.name) return res.status(404).send({message:'name es requerido'});

        const create = await type.create({
            name: body.name
        });

        return res.status(201).send({message:'Tipo creado correctamente.'})
    } catch (error) {
        return res.status(500).send(message.error)
    }
};

exports.getTypes = async(req, res) =>{
    try {
        const { typeName } = req.query;

        if(typeName){
            const find = await element.findAll({
                where: { statusDelete: false },
                include:{
                    model:name,
                    where:{name:{ [Op.iRegexp]: typeName }}
                }
            })
            return res.status(200).send(find);
        };

        const find = await type.findAll({
            where: { statusDelete: false},
        });
        
        return res.status(200).send(find)

    }   catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updateType = async (req, res) => {
    try {
        const { body, params } = req;

        if(!body)return res.status(400).send({message:'Los datos son requeridos para actualizar'});
        if(!body.name) return res.status(404).send({message:'name es requerido'});

        const validate = await type.findOne({
            where:{ id: params.id },
        });
        
        if(!validate) 
            return res.status(404).send({message:'No se encontro el tipo'});
        if(validate.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el tipo'});

        validate.name = body.name;   
        validate.save();

        return res.status(200).send({message:'Tu tipo se actualizo correctamente'})
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.deleteType = async(req, res) =>{
    try {
        const { id }=req.params;

        const find = await type.findByPk(id);

        if(!find)
            return res.status(404).send({message:'No se encontro el tipo'});
        if(find.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el tipo'});

        find.statusDelete = true;
        find.save();

        return res.status(200).send({message:'Tipo eliminado correctamente'});

    } catch (error) {
        return res.status(500).send(message.error);
    }
};