module.exports = (sequelize, Sequelize) =>{
    const Group = sequelize.define('group',{
        name:{
            type: Sequelize.STRING,
            unique:true,
        },
        number:{
            type: Sequelize.INTEGER,
            unique:true,
        },
    }),
}