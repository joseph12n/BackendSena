/**
 * MIDDLEWARE control de roles de usuario
 * 
 * sirve para verificar que el usuario autenticado tiene permisos necesarios para acceder a una ruta especifica
 * 
 * funcion factory checkRole() permite especificar roles permitidos 
 * funcion Helper para roles especificos isAdmin, isCoordinador, isAuxiliar
 * requiere que verifytoken se haya ejecutado primero
 * flujo:
 * verifica que req.userRole existe
 * compara req.userRole contra lista de roles permitidos
 * si esta en lista continua
 * si no esta en la lista retorna 403 Forbidden con mensaje descriptivo
 * si no existe UserRole retorna 401 (Token corrupto)
 * 
 * uso:
 * checkRole ('admin') solo admin
 * checkRole ('admin', 'coordinador', 'auxiliar') admin y coordinador con permisos
 * checkRole ('admin', 'coordinador', 'auxiliar') todos con permisos
 * Roles del sistema:
 * admin acceso total
 * coordinador no puede eliminar ni gestionar usuarios
 * auxiliar acceso limitado a tareas especificas
 */

/**
 * factory function checkRole
 * retorna middleware qque verifica si el usuario tiene uno de los roles permitidos
 * @param {...string} allowedRoles roles permitidos en el sistema
 * @return {function} middleware de express  
 */
const checkRole = (...allowedRoles) => {
    return (req, res, next) => {
        //validar que el usuario fue autenticado y veryfyToken ejecutado
        //req, userRole es establecido por veryfyToken middleware
        if (!req.userRole){
            return res.status(401)({
                success: false,
                message: 'Token invalido o expirado'
            });
        }
    };
};