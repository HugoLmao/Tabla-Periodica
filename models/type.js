module.exports = (sequelize, Sequelize) =>{
    const Type = sequelize.define('type',{
        name:{
            type: Sequelize.STRING,
            unique:true,
        },
        statusDelete:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Type
}