/*
  Con variables de entorno
*/

const { Pool } = require('pg');

//Importar Variables de entorno (acceso)
const { config } = require('./../config/config');

const options = {}

if(config.isProd){ //Modo de Produción

  options.connectionString = config.dbUrl;
  options.ssl = {
    rejectUnauthorized: false
  }

}else{ //Modo de Desarrollo
  const USER = encodeURIComponent(config.dbUser);
  const PASSWORD = encodeURIComponent(config.dbPassword);
  const HOST = config.dbHost;
  const PORT = config.dbPort;
  const NAME = config.dbName;

  const URI = `postgres://${USER}:${PASSWORD}@${HOST}:${PORT}/${NAME}`; //Url de conexión
  options.connectionString = URI;

}

const pool = new Pool( options );

/* const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'admin123',
  database: 'my_store'
}); */

module.exports = pool;
