/*
  Verificación de la password encriptada por bcrypt anteriormente.
*/

const bcrypt = require('bcrypt');


async function verifyPassword(){
  const myPassword = 'admin 123 .202' ; //password de prueba

  //Password encriptada
  const hash = '$2b$10$W3ILrw0C2day3OHbJy.vXusUEBC.UrbkQOvKVaNhR3/jyuwemtKXO';

  const isMatch = await bcrypt.compare(myPassword, hash);

  console.log(isMatch);
}


verifyPassword();

