/**
 * Rutas de autenticacion 
 * define los endpoints relativos a autenticacion de usuarios
 * POST /api/auth/signin registar un nuevo usuario
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifySingUp } = require('../middlewares');
const { verifyToken } = require('../middlewares/authJwt');
const { checkRole } = require('../middlewares/role');

//Rutas de autenticacion

//Requiere email-usuario y password
router.post('/signin', authController.signin);

router.post('/singup',
    verifyToken,
    checkRole('admin'),
    verifySingUp.checkDuplicateUsernameOrEmail,
    verifySingUp.checkRolesExisted,
    authController.signup
);

module.exports = router; 