/*
  USO de la librería bcrypt, encriptado de passwords,
  el string generado es el que se debe de guardar en la BD.
*/

const bcrypt = require('bcrypt');


async function hashPassword(){
  const myPassword = 'admin 123 .202' ; //password de prueba
  const hash = await bcrypt.hash(myPassword, 10);  //Genera encriptación de password y número de iteraciones de encriptación.

  console.log(hash);
}


hashPassword();

