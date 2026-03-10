/**
 * Rutas de productos
 * Define los endpoints CRUD para la gestion de productos
 * Los productos son elementos dentro de subcategorias
 * endpoints: 
 * Post /api/productos crear un nuevo producto
 * Get /api/productos obtiene todos los productos
 * Get /api/productos/:id obtiene un producto por id
 * Put /api/productos/:id actualiza un producto por id
 * Delete /api/productos/:id elimina o desactiva un producto por id
 */

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { check } = require('express-validator');
const { verifyToken } = require('../middlewares/authJwt');
const { checkRole } = require('../middlewares/role');

const validateProduct = [
    check('name')  
        .not().isEmpty()
        .withMessage('El nombre es obligatorio'),

    check('description')
        .not().isEmpty()
        .withMessage('la descripcion es obligatoria'),

    check('price')
        .not().isEmpty()
        .withMessage('el precio es obligatorio'),

    check('stock')
        .not().isEmpty()
        .withMessage('el stock es obligatorio'),

    check('category')
        .not().isEmpty()
        .withMessage('la categoria es obligatoria'),

        
    check('subcategory')
        .not().isEmpty()
        .withMessage('la subcategoria es obligatoria'),
]
//Rutas CRUD

router.post('/',
    verifyToken,
    checkRole('admin','coordinador','auxiliar'),
    validateProduct,
    productController.createProduct
);

router.get('/',
        verifyToken,
        productController.getProducts);

router.get('/:id',
        verifyToken,
        productController.getProductById);

router.put('/:id',
    verifyToken,
    checkRole('admin','coordinador'),
    validateProduct,
    productController.updateProduct
);
router.delete('/:id',
    verifyToken,
    checkRole('admin'),
    productController.deleteProduct
);

module.exports = router;