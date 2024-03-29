require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME
} = process.env;

const dbConnection = process.env.DB_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

const sequelize = new Sequelize(dbConnection, {
  logging: false, 
  native: false, 
});

sequelize.authenticate()
  .then((res) => console.log("Connection to DB-Drivers stablished succesfully"))
  .catch((error) => console.log("Connection fail: " + error.message))

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Driver, Team } = sequelize.models;

Driver.belongsToMany(Team, { through: 'driver_team', timestamps: false });
Team.belongsToMany(Driver, { through: "driver_team", timestamps: false });

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};