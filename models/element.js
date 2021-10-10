module.exports = (sequelize, Sequelize) =>{
    const Element = sequelize.define('element',{
        name:{
            type: Sequelize.STRING
        },
        symbol:{
            type: Sequelize.STRING,
            unique:true,
        },
        atomicNumber:{
            type: Sequelize.INTEGER,
            unique:true,
        },
        atomicMass:{
            type: Sequelize.DECIMAL,
        },
        image:{
            type: Sequelize.STRING
        },
        statusDelete:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Element;
};