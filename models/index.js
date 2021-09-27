const Sequelize = require('sequelize');
const DB = require("../config/config");

const sequelize = new Sequelize(DB.DBNAME, DB.USER, DB.PASSWORD, {
    host: DB.HOST,
    dialect: DB.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.element = require('./element')(sequelize, Sequelize);
db.group = require('./group')(sequelize, Sequelize);
db.period = require('./period')(sequelize, Sequelize);
db.type = require('./type')(sequelize, Sequelize);

db.type.hasMany(db.element);
db.group.hasMany(db.element);
db.period.hasMany(db.element);
db.element.belongsTo(db.type);
db.element.belongsTo(db.group);
db.element.belongsTo(db.period);

module.exports = db;