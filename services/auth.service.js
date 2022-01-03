/*

*/

const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('./../config/config');

const UserService = require('./user.service');
const userService = new UserService();

class AuthService {

  async getUser(email, password){
    const user = await userService.findByEmail(email);

    if(!user){ //Usuario no encontrado por el filtro de email
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password); //Encriptado

    if(!isMatch){ //Contraseñas no coinciden
      throw boom.unauthorized();
    }

    delete user.dataValues.password;
    return user;
  }

  async sendRecovery(email){
    const user = await userService.findByEmail(email);
    if(!user){
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await userService.update(user.id, {recoveryToken: token});

    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: "Email para recuperar contraseña",
      html: `<b>Ingresa a este link => ${link} </b>`,
      //text: "Hello world?", // plain text body
    }

    const rta = await this.sendMail(mail);

    return rta;
  }

  //Firmado de Token de autenticación
  signToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    };

    const token =  jwt.sign(payload, config.jwtSecret);

    delete user.dataValues.recoveryToken;

    return {
      user,
      token
    };
  }

  async changePassword(token, newPassword){
    try{
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await userService.findOne(payload.sub);

      if(user.recoveryToken !== token){
        throw boom.unauthorized();
      }

      const hash = await bcrypt.hash(newPassword, 10);
      await userService.update(user.id, { recoveryToken: null, password: hash });

      return { message: 'password changed' };

    }catch(error){
      throw boom.unauthorized();
    }
  }

  async sendMail(infoMail){

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword
      },
    });

    await transporter.sendMail(infoMail);

    return { message: 'Mail Sent' };
  }

}

module.exports = AuthService;
