import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configs from '../../config/config.js';

const basename = path.basename(__filename);
const config = configs;
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, {
  username: 'postgres',
  password: 'pg_password',
  database: 'school_demo',
  host: 'db',
  dialect: 'postgres',
});


fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


export default db;
