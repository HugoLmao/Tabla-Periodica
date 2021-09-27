const db = require('../models/index')
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const element = db.element

exports.createElement = async(req, res)=>{
    try {
        const { body } = req;

        if(!body.name) return res.status(404).send({message:'name es requerido'});
        if(!body.simbol) return res.status(404).send({message:'simbol es requerido'});
        if(!body.atomicNumber) return res.status(404).send({message:'atomicNumber es requerido'});
        if(!body.atomicMass) return res.status(404).send({message:'atomicMass es requerido'});

        const create = await element.create({
            name: body.name,
            simbol: body.simbol,
            atomicNumber: body.atomicNumber,
            atomicMass: body.atomicMass,
        });

        return res.status(201).send({message: 'elemento creado correctamente'})
    } catch(error) {
        return res.status(500).send(message.error)
    }
};

exports.getElements = async(req, res) =>{
    try {
        const { elementName } = req.query;

        if(elementName){
            const find = await element.findAll({
                where: {name:{ [Op.iRegexp]: elementName },statusDelete: false }
            })
            return res.status(200).send(find);
        };

        const find = await element.findAll({
            where: { statusDelete: false},
        });
        
        return res.status(200).send(find)

    }   catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updateElement = async (req, res) => {
    try {
        const { body, params } = req;

        if(!body)return res.status(400).send({message:'Los datos son requeridos para actualizar'});
        if(!body.name) return res.status(404).send({message:'name es requerido'});
        if(!body.simbol) return res.status(404).send({message:'simbol es requerido'});
        if(!body.atomicNumber) return res.status(404).send({message:'atomicNumber es requerido'});
        if(!body.atomicMass) return res.status(404).send({message:'atomicMass es requerido'});

        const validate = await element.findOne({
            where:{ id: params.id },
        });
        
        if(!validate) 
            return res.status(404).send({message:'No se encontro el elemento'});
        if(validate.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el elemento'});

        validate.name = body.name;
        validate.simbol = body.simbol;    
        validate.atomicNumber = body.atomicNumber;    
        validate.atomicMass = body.atomicMass;    
        validate.save();

        return res.status(201).send({message:'Tu elemento se actualizo correctamente'})
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.deleteElement = async(req, res) =>{
    try {
        const { id }=req.params;

        const find = await element.findByPk(id);

        if(!find)
            return res.status(404).send({message:'No se encontro el elemento'});
        if(find.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el elemento'});

        find.statusDelete = true;
        find.save();

        return res.status(200).send({message:'Elemento eliminado correctamente'});

    } catch (error) {
        return res.status(500).send(message.error);
    }
};