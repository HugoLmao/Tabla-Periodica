module.exports = (sequelize, Sequelize) =>{
    const UserAddress = sequelize.define('userAddress',{
        country:{
            type: Sequelize.STRING,
        },
        state:{
            type: Sequelize.STRING
        },
        city:{
            type: Sequelize.STRING
        },
        statusDelete:{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
    });
    return UserAddress
}