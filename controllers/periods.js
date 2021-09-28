const db = require('../models/index')
const Sequelize = require("sequelize")
const Op = Sequelize.Op

const element = db.element
const period = db.period

exports.createPeriod = async(req, res) =>{
    try {
        const { body } = req;

        if(!body.number) return res.status(404).send({message:'number es requerido'});

        const create = await period.create({
            name: body.name,
            number: body.number,
        });

        return res.status(201).send({message:'Periodo creado correctamente.'})
    } catch (error) {
        return res.status(500).send(message.error)
    }
};

exports.getPeriods = async(req, res) =>{
    try {

        const find = await period.findAll({
            where: { 
                statusDelete: false,
            },
                include:{
                    model: element,
                },
        });
        
        return res.status(200).send(find)

    }   catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getPeriodById = async(req, res) =>{
    try {
        const { id }=req.params;

        const find = await period.findByPk(id,{
            include:{
                model: element
            },
        });
        if(!find)
            return res.status(404).send({message:'No se encontro el periodo'});
        if(find.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el periodo'});
        
        return res.status(200).send(find)

    }   catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updatePeriod = async (req, res) => {
    try {
        const { body, params } = req;

        if(!body)return res.status(400).send({message:'Los datos son requeridos para actualizar'});
        if(!body.number) return res.status(404).send({message:'number es requerido'});

        const validate = await period.findOne({
            where:{ id: params.id },
        });
        
        if(!validate) 
            return res.status(404).send({message:'No se encontro el periodo'});
        if(validate.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el periodo'});

        validate.number = body.number;   
        validate.save();

        return res.status(200).send({message:'Tu periodo se actualizo correctamente'})
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.deletePeriod = async(req, res) =>{
    try {
        const { id }=req.params;

        const find = await period.findByPk(id);

        if(!find)
            return res.status(404).send({message:'No se encontro el periodo'});
        if(find.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el periodo'});

        find.statusDelete = true;
        find.save();

        return res.status(200).send({message:'Periodo eliminado correctamente'});

    } catch (error) {
        return res.status(500).send(message.error);
    }
};