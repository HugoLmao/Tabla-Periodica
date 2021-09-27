const express = require('express');

const enrutador = express.Router();

const element = require('../controllers/elements')
const type = require('../controllers/types')
const period = require('../controllers/periods')
const group = require('../controllers/groups')


//Rutas para elementos

enrutador
    .route("/elements")
    .get(element.getElements)
    .post(element.createElement);
    
enrutador
    .route("/elements/:id")
    .put(element.updateElement)
    .delete(element.deleteElement);

    //Rutas para tipos

enrutador
    .route("/types")
    .get(type.getTypes)
    .post(type.createType);
    
enrutador
    .route("/types/:id")
    .put(type.updateType)
    .delete(type.deleteType);
    
//Rutas para periodos

enrutador
.route("/periods")
    .get(period.getPeriods)
    .post(period.createPeriod);
    
enrutador
    .route("/periods/:id")
    .put(period.updatePeriod)
    .delete(period.deletePeriod);

//Rutas para grupos

enrutador
    .route("/groups")
    .get(group.getGroups)
    .post(group.createGroup);

enrutador
    .route("/groups/:id")
    .put(group.updateGroup)
    .delete(group.deleteGroup);

module.exports = enrutador;