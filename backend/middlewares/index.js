/**
 * archivo indice de middlewares
 * centraliza la importacion de todos los middlewares de autenticacion y autorizacion
 * permite importar multiples middlewares de forma concisa en las rutas
 */

const authJWT = require('./authJwt');
const verifySingUp = require('./verifySingUp');

//exportar todos los middlewares agrupados o por modulo

module.exports = {
    authJWT: require('./authJwt'),
    verifySingUp: require('./verifySingUp'),
    role: require('./role')
};