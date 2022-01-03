/*
Dotenv es un módulo de dependencia cero que carga variables de
entorno desde un .envarchivo a process.env.

Variables de Entorno de configuración

  instalar dotenv
*/

require('dotenv').config();


//Carga el archivo .env
const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,

  //Data contenida en dbUrl
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
};


module.exports = { config };
