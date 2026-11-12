// Este archivo contiene los controladores para la autenticación de usuarios
// y gestión de perfil de usuario.

const authService = require('../services/authService');

exports.login = (req, res) => {
  res.json(authService.login(req.body.usuario, req.body.password));
};

exports.perfil = (req, res) => {
  res.json(authService.perfil(req.usuario));
};
