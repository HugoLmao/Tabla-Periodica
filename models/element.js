module.exports = (sequelize, Sequelize) =>{
    const Element = sequelize.define('element',{
        name:{
            type: Sequelize.STRING,
            unique:true,
        },
        simbol:{
            type: Sequelize.STRING,
            unique:true,
        },
        atomicNumber:{
            type: Sequelize.INTEGER,
            unique:true,
        },
        atomicMass:{
            type: Sequelize.INTEGER,
        },
        //Anexar image despues de saber como guardar imagenes en la base de datos

        statusDelete:{
            typpe: Sequelize.BOOLEAN,
            defaultValue: false,
        }
    });
    return Element;
};