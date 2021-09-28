const express = require('express');

const enrutador = express.Router();

const element = require('../controllers/elements');
const type = require('../controllers/types');
const period = require('../controllers/periods');
const group = require('../controllers/groups');
const generalities = require('../controllers/generalities');
const user = require('../controllers/users');
const userAddress = require('../controllers/userAddresses');


//Rutas para elementos

enrutador
    .route("/elements")
    .get(element.getElements)
    .post(element.createElement);
    
enrutador
    .route("/elements/:id")
    .get(element.getElementById)
    .put(element.updateElement)
    .delete(element.deleteElement);

    //Rutas para tipos

enrutador
    .route("/types")
    .get(type.getTypes)
    .post(type.createType);
    
enrutador
    .route("/types/:id")
    .get(type.getTypeById)
    .put(type.updateType)
    .delete(type.deleteType);
    
//Rutas para periodos

enrutador
.route("/periods")
    .get(period.getPeriods)
    .post(period.createPeriod);
    
enrutador
    .route("/periods/:id")
    .get(period.getPeriodById)
    .put(period.updatePeriod)
    .delete(period.deletePeriod);

//Rutas para grupos

enrutador
    .route("/groups")
    .get(group.getGroups)
    .post(group.createGroup);

enrutador
    .route("/groups/:id")
    .get(group.getGroupById)
    .put(group.updateGroup)
    .delete(group.deleteGroup);


// rutas para usuarios 

enrutador
    .route("/users")
    .get(user.getUsers)
    .post(user.createUser);

enrutador
    .route("/users/:id")
    .get(user.getUsersById)
    .put(user.updateUser)
    .delete(user.deleteUser);

// rutas para direcciones de usuarios 

enrutador
    .route("/userAddresses")
    .get(userAddress.getUserAddresses)
    .post(userAddress.createUserAddress);

enrutador
    .route("/userAddresses/:id")
    .get(userAddress.getUserAddressById)
    .put(userAddress.updateUserAddress)
    .delete(userAddress.deleteUserAddress);

// rutas para generalidades

enrutador
    .route('/login')
    .post(generalities.login);    
module.exports = enrutador;