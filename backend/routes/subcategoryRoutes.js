/**
 * Rutas de subcategororias
 * define los endpoints CRUD para la gestion de subcategorias
 * las subcategorias son contenedores padres de subsubcategorias y productos
 * endpoints:
 * Post /api/subcategories crea una nueva subcategoria
 * Get /api/subcategories obtiene todas las subcategorias
 * Get /api/subcategories/:id obtiene una subcategoria por id
 * Put /api/subcategories/:id actualiza una subcategoria por id
 * Delete /api/subcategories/:id elimina una subcategoria/desactivar 
 */

const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');
const { check } = require('express-validator');
const { verifyToken } = require('../middlewares/authJwt');
const { checkRole } = require('../middlewares/role');

const validateSubcategory = [
    check('name')
        .not().isEmpty()
        .withMessage('el nombre es obligatorio'),
 
    check('description')
        .not().isEmpty()
        .withMessage('la descipcion es obligatoria'),

    check('category')
        .not().isEmpty()
        .withMessage('la categoria es obligatoria'),
];
//Rutas CRUD

router.post('/',
    verifyToken,
    checkRole('admin','coordinador'),
    validateSubcategory,
    subcategoryController.createSubcategory
);

router.get('/', 
     verifyToken,
     subcategoryController.getSubcategories);

router.get('/:id', 
     verifyToken,
     subcategoryController.getSubcategoryById);

router.put('/:id',
    verifyToken,
    checkRole('admin','coordinador'),
    validateSubcategory,
    subcategoryController.updateSubcategory
);
router.delete('/:id',
    verifyToken,
    checkRole('admin'),
    subcategoryController.deleteCategory
);

module.exports = router;
