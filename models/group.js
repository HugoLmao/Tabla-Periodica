module.exports = (sequelize, Sequelize) =>{
    const Group = sequelize.define('group',{
        name:{
            type: Sequelize.STRING,
        },
        number:{
            type: Sequelize.INTEGER,
            unique: true,
        },
        statusDelete:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return Group;
}