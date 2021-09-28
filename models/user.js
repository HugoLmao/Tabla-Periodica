module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define('usere',{
        name:{
            type: Sequelize.STRING,
        },
        lastName:{
            type: Sequelize.STRING,
        },
        email:{
            type: Sequelize.STRING,
            unique: true,
        },
        password:{
            type: Sequelize.STRING
        },
        statusDelete:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return User
}