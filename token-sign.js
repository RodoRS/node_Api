/*
  Autorización con JsonWebToken
*/

const jwt = require('jsonwebtoken');

const secret = 'myCat'; // Debe ser variable de entorno (Solo el backen debe de saberlo), llave que sirve para firmar

const payload = {
  sub: 1, //Identificador de token
  role: 'customer'
}


function signToken(payload, secret){
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);


console.log(token);



