/* DESCRIPCIÓN

//Lógica de negocio dentro de la estrategia

*/

const { Strategy } = require('passport-local');

const AuthService  = require('./../../../services/auth.service');
const authService = new AuthService();

const LocalStrategy = new Strategy(
  { //Personalizar los campos de entrada en la estrategia al hacer el post
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try{
      const user = await authService.getUser(email, password);

      done(null, user);
    }catch(error){
      done(error, false);
    }
  }
);


module.exports = LocalStrategy;
