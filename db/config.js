/*
  Configuración para Generar Migraciones de BD
*/

const { config } = require('./../config/config');


//Exportar los ambientes, de desarrollo y producción
module.exports = {
  development: {
    url: config.dbUrl,
    dialect: 'postgres',
  },
  production: {
    url: config.dbUrl,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }
}

