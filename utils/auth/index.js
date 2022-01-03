/*
  Implementación de las Estrategias de Passport
*/

const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

//Implementación
passport.use(LocalStrategy);
passport.use(JwtStrategy);


