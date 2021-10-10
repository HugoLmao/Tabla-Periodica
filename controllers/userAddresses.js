const db = require('../models/index')

const userAddress = db.userAddress;
const user =db.user;

exports.createUserAddress = async(req, res) =>{
    try {
        const { body }=req;

        if (!body.country)
            return res.send(400).send({message:'country es requerido'})
        if (!body.state)
            return res.send(400).send({message:'state es requerido'})
        if (!body.city)
            return res.send(400).send({message:'city es requerido'})

        const create= await userAddress.create({
            country: body.country,
            state: body.state,
            city: body.city,
        });

        return res.status(200).send({message:'Direccion creada correctamente'});

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getUserAddresses = async (req,res) =>{
    try {
        const find = await userAddress.findAll({
            where: { statusDelete: false },
            include:{
                model:user,
            }
        });
        return res.status(200).send(find)
    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.getUserAddressById = async (req,res) =>{
    try {
        const { id }=req.params;

        if(!body)return res.status(400).send({message:'Los datos son requeridos'})

        const find = await userAddress.findByPk(id,{
            include:{
                model:user
            },
        });

        if(!find)return res.status(404).send({message:'userAddress no existe'})
        if(find.statusDelete === true) return res.status(404).send({message:'No se encontro la direccion'});

        return res.status(200).send(find);

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.updateUserAddress = async (req,res) =>{
    try {
        const {body, params}=req;

        if(!body)return res.status(400).send({message:'Los datos son requeridos'})

        const find = await userAddress.findOne({
            where:{id:params.id, statusDelete:false}
        });

        if(!find)return res.status(404).send({message:'userAddress no existe'})

        find.country = body.country;
        find.state = body.state;
        find.city = body.city;
        find.save();
        return res.status(200).send({message:'userAddress actualizada correctamente'})

    } catch (error) {
        return res.status(500).send(message.error);
    }
};

exports.deleteUserAddress = async (req, res) =>{
    try {
        const { id } = req.params;
        const validate = await userAddress.findByPk(id)
        if (!validate) return res.status(404).send({message:'userAddress no existe'});
        if (validate.statusDelete === true) return res.status(404).send({message:'userAddress no existe'});

        validate.statusDelete = true;
        validate.save();

        return res.status(200).send({message:'userAddress eliminado correctamente'});
    } catch (error) {
        return res.status(500).send(message.error);
    }
};