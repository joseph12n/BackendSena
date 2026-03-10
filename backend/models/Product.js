/**
 * Modelo de producto MONGO DB
 * Define la estructura del producto
 * el producto depende de una subcategoria que depende de una categoria
 * muchos productos pueden pertenecer a una subcategoria 
 * tiene relacion un user para ver quien creo el producto
 * soporte de imagenes (array de url)
 * validacion de valores numericos (no negativos)
 */

const mongoose =require('mongoose');

// campos de la tabla producto

const productSchema = new mongoose.Schema({
    //Nombre del producto unico y requerido
    name: {
        type: String,
        required: [true, 'El nombre es oblogatorio'],
        unique: true, // no puede haber dos productos con el mismo nombre
        trim: true //Eliminar espacios al inicio y final 
    },

    //Descripcion del producto - requerida
    description: {
        type: String,
        required: [true, 'la descripcion es requerida'],
        trim: true
    },

    //precio de unidades monetarias
    //no puede ser negativo

    price: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser negativo'] //Rechaza los valores menores a 0 
    },

    //cantidad de stock
    //no puede ser negativa
     stock: {
        type: Number,
        required: [true, 'El stock es obligatorio'],
        min: [0, 'El stock no puede ser negativo']
    },

    //categoria padre esta subcategoria pertenece a una categoria
    //relacion 1 - muchos Una categoria puede tener muchas subcategorias
    //un producto pertenece a una subcategoria pero una subcategoria puede tener muchos productos relacion 1 - muchos

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // puede ser poblado con .populate ('category')
        required: [true, 'la categoria es requerida']
    },

    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory', // puede ser poblado con .populate ('subcategory')
        required: [true, 'la subcategoria es requerida']
    },

    //quien creo el producto
    //Referencia de User no requerido
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' //Puede ser poblado para mostrar los usuarios
    },

    //Array de urls de imagenes de productos
    images: [{
        type: String, //url de la imagen
    }],

    //Activa/desactiva el producto pero no  elimina
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,  //Agrega createdAt y updatedAt automaticamente
    versionKey: false,  //No incluir campos __V
});

/**
 * MIDDLEWARE PRE-SAVE
 * Limpia indices duplicados
 * Mongodb a veces crea multiples indices con el misno nombre
 * esto causa conflictos al integrar dropIndes o recrear indices
 * este moddleware limpia los indices problematicos
 * proceso
 * 1 obtiene una lista de todos los indices de la coleccion 
 * 2 busca si existe indice con nombre name_1 (antiguo o duplicado)
 * Si existe lo elimina antes de nuevas operaciones 
 * ignora errores si el indice no existe
 * continua con el guardado normal 
 */
productSchema.post('save', function(error, doc, next) {
   // verificar si es errror de mongoDB por violacion de indice unico 

        if (error.name === 'MongoServerError' && error.code ===11000) {
            return next(new Error('Ya existe un producto con ese nombre'))
        }
        //pasar el error tal como es
        next(error); 
});

/**
 * crear indice unico
 * 
 * Mongo rechazara cualquier intento de insertar o actualizar un documento con un valor de name que ya exista
 * aumenta la velocidad de busquedas
 */

//exportar el modelo
module.exports = mongoose.model('Product', productSchema);