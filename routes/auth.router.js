const express = require('express');
const passport = require('passport');


const AuthService = require('./../services/auth.service');

const router = express.Router();
const authService = new AuthService();

//Login
router.post('/login',
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user;

      res.json(authService.signToken(user));

    } catch (error) {
      next(error);
    }
  }
);

//Recovery Password
router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const rta = await authService.sendRecovery(email);
      res.json(rta);

    } catch (error) {
      next(error);
    }
  }
);

//Change Password
router.post('/change-password',
  //Poner Schema de Validación de Datos
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;

      const rta = await authService.changePassword(token, newPassword);
      res.json(rta);

    } catch (error) {
      next(error);
    }
  }
);



module.exports = router;
