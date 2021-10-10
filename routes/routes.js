const express = require('express');

const enrutador = express.Router();

const element = require('../controllers/elements');
const type = require('../controllers/types');
const period = require('../controllers/periods');
const group = require('../controllers/groups');
const generalities = require('../controllers/generalities');
const user = require('../controllers/users');
const userAddress = require('../controllers/userAddresses');

const { verifyToken } = require('../middleware/authorization')

//Rutas para elementos

enrutador
    .route("/elements")
    .get(element.getElements)
    .post(verifyToken, element.createElement);
    
enrutador
    .route("/elements/:id")
    .get(element.getElementById)
    .put(verifyToken, element.updateElement)
    .delete(verifyToken, element.deleteElement);

enrutador
    .route("/elements/1orN/:atomicNumber1::atomicNumber2") //127.0.0.1:3000/GOD/clase/elements/1orN/"numero1":"numero2"
    .get(element.getNelements);

    //Rutas para tipos

enrutador
    .route("/types")
    .get(type.getTypes)
    .post(verifyToken, type.createType);
    
enrutador
    .route("/types/:id")
    .get(type.getTypeById)
    .put(verifyToken, type.updateType)
    .delete(verifyToken, type.deleteType);
    
//Rutas para periodos

enrutador
.route("/periods")
    .get(period.getPeriods)
    .post(verifyToken, period.createPeriod);
    
enrutador
    .route("/periods/:id")
    .get(period.getPeriodById)
    .put(verifyToken, period.updatePeriod)
    .delete(verifyToken, period.deletePeriod);

//Rutas para grupos

enrutador
    .route("/groups")
    .get(group.getGroups)
    .post(verifyToken, group.createGroup);

enrutador
    .route("/groups/:id")
    .get(group.getGroupById)
    .put(verifyToken, group.updateGroup)
    .delete(verifyToken, group.deleteGroup);


// rutas para usuarios 

enrutador
    .route("/users")
    .get(verifyToken, user.getUsers)
    .post(user.createUser);

enrutador
    .route("/users/:id")
    .get(verifyToken, user.getUsersById)
    .put(verifyToken, user.updateUser)
    .delete(verifyToken, user.deleteUser);

// rutas para direcciones de usuarios 

enrutador
    .route("/userAddresses")
    .get(verifyToken, userAddress.getUserAddresses)
    .post(userAddress.createUserAddress);

enrutador
    .route("/userAddresses/:id")
    .get(verifyToken, userAddress.getUserAddressById)
    .put(verifyToken, userAddress.updateUserAddress)
    .delete(verifyToken, userAddress.deleteUserAddress);

// rutas para generalidades

enrutador
    .route('/login')
    .post(generalities.login);    

module.exports = enrutador;