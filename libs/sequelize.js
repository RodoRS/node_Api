/*
  Obtiene los datos de configuración de la base de datos y crear su URI
  Permite hacer la configuración de los modelos de la base de datos.
 */

const { Sequelize } = require('sequelize');
const { config } = require('./../config/config'); //Variables de entorno
const setupModels = require('./../db/models/index'); //Inicializa los Modelos

//Configuraciones
const options = {
  dialect: 'postgres',
  logging: config.isProd ? false: true,
};

if(config.isProd){ //Solo Producción
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }

}

//--Postgres => Conexión en Produción y en Desarrollo con config.dbUrl que se sustituye por URI
const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);

module.exports = sequelize;

