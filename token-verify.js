
/*
  Verificación de JsonWebToken
*/

const jwt = require('jsonwebtoken');

const secret = 'myCat'; // Debe ser variable de entorno (Solo el backen debe de saberlo), llave que sirve para firmar

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY0MDk2ODYxOH0.h7rmrLWa0sbfO1wfdaD5HP4hAsikBTqnX53mJbuO4xg';

function verifyToken(token, secret){
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);


console.log(payload);



