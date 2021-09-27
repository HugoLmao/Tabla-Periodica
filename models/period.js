module.exports = (sequelize, Sequelize) =>{
    const Period = sequelize.define('period',{
        number:{
            type: Sequelize.INTEGER,
            unique:true,
        },
        statusDelete:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Period;
}