const db = require('../models/index');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const fileUpload = require('../utils/uploadImages');
const type = db.type;
const group = db.group;
const period = db.period
const element = db.element;

exports.createElement = async(req, res)=>{
    try {
        const { body } = req;

        if(!body.name) return res.status(404).send({message:'name es requerido'});
        if(!body.simbol) return res.status(404).send({message:'simbol es requerido'});
        if(!body.atomicNumber) return res.status(404).send({message:'atomicNumber es requerido'});
        if(!body.atomicMass) return res.status(404).send({message:'atomicMass es requerido'});
        
        if(!body.typeId) return res.status(404).send({message:'typeid es requerido'});
        if(!body.periodId) return res.status(404).send({message:'periodid es requerido'});
        if(!body.groupId) return res.status(404).send({message:'groupid es requerido'});

        const findType = await type.findOne({
            where:{id:body.typeId,statusDelete:false}})
        const findPeriod = await period.findOne({
            where:{id:body.periodId,statusDelete:false}})
        const findGroup = await group.findOne({
            where:{id:body.groupId,statusDelete:false
            }})

            let image = await fileUpload.fileUpload(body.image,'/images', body.name)
            
        if(!findType)
            return res.status(404).send({message:'Type no encontrado'});
        if(!findPeriod)
            return res.status(404).send({message:'Period no encontrado'});
        if(!findGroup)
            return res.status(404).send({message:'Group no encontrado'});
        
        
        const create = await element.create({
            name: body.name,
            simbol: body.simbol,
            atomicNumber: body.atomicNumber,
            atomicMass: body.atomicMass,
            typeId: body.typeId,
            periodId: body.periodId,
            groupId: body.groupId,
            image: body.image
        });

        return res.status(201).send({message: 'elemento creado correctamente'})
    } catch(error) {
        return res.status(500).send(message.error)
    }
};

exports.getElements = async(req, res) =>{
        
    try {
    //Para encontrar elementos por nombre


        const { elementName } = req.query;

        if(elementName){
            const find = await element.findAll({
                where: {name:{ [Op.iRegexp]: elementName },statusDelete: false }
            })
            return res.status(200).send(find);
        };
        
    //Para encontrar elementos por numero atomico de diferentes formas.

        //AN significa atomicNumber
        //Encontrar elementos por un numero atomico.
        const { elementAN } = req.query;

        if(elementAN){
            const find = await element.findAll({
                where: {
                    atomicNumber: {[Op.eq]: elementAN},
                    statusDelete: false,
                }
            })
            
            return res.status(200).send(find);
        };

    
    //Para encontrar elementos por su tipo, grupo y periodo usar el metodo "get" de cada uno o "getById"

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
        if(!body.typeId) return res.status(404).send({message:'typeid es requerido'});
        if(!body.periodId) return res.status(404).send({message:'periodid es requerido'});
        if(!body.groupId) return res.status(404).send({message:'groupid es requerido'});


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
        validate.image = body.image;
        validate.typeId = body.typeId;
        validate.periodId = body.periodId;
        validate.groupId = body.groupId;

        validate.save();

        return res.status(201).send({message:'Tu elemento se actualizo correctamente'})
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.deleteElement = async(req, res) =>{
    try {
        const { id } = req.params;

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

exports.getElementById = async(req, res) =>{
    try {
        const { id }=req.params;

        const find = await element.findByPk(id);

        if(!find)
            return res.status(404).send({message:'No se encontro el elemento'});
        if(find.statusDelete === true) 
            return res.status(404).send({message:'No se encontro el elemento'});

        res.status(200).send(find)

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getNelements = async (req, res)=>{
    try {
        const { atomicNumber1 } = (req.params);
        const { atomicNumber2 } = (req.params);

            const find = await element.findAll({
                where: {
                    atomicNumber: {[Op.between]: [atomicNumber1, atomicNumber2] }, 
                    statusDelete: false,
                }
            });
            return res.status(200).send(find);

    } catch (error) {
        return res.status(500).send(message.error);      
    }
};