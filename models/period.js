module.exports = (sequelize, Sequelize) =>{
    const Type = sequelize.define('type',{
        number:{
            type: Sequelize.INTEGER,
            unique:true,
        }
    })
}