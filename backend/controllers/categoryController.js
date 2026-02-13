/**
 * controlador de categorias
 * maneja todas las opreaciones (CRUD) relacionadas con categorias
 */

const Category = require ('../models/Category');
/**
 * create: crear nueva categoria
 * POST /api/categories
 * Auth bearer token requerido
 * Roles: admin y coordinador
 * body requerido:
 * name: nombre de la categoria
 * descriprion: descripcion de la categoria
 * retorna:
 * 201: categoria creada en mongoDB    
 * 400: validacion fallida o nombre duplicando
 * 500: Error en bases de datos
 */
exports.createCategory = async (req, res) => {
    try{
        const { name, description } = req.body;
        //validacion de los campos de entrada
        if(!name || typeof name !== 'string' || name.trim()){
            return res.status(400).json({
                success: false,
                message: 'El modelo es obligatorio, debe ser texto valido'
            });
        }
            if(!description || typeof description !== 'string' || description.trim()){
            return res.status(400).json({
                success: false,
                message: 'la descripcion es obligatoria y debe ser texto valido'
            });    
        }

        //limpiar espacion en blanco
        const trimmedName = name.trim();
        const trimmedDesc = description.trim();

        //verificar si ya existe una categoria con el mismo nombre
        const existingCategory = await Category.findOne({ name: trimmedName});
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una vategoria con ese nombre'
            });
        }

        //crear nueva categoria
        const newCategory = new Category({
            name: trimmedName,
            description: trimmedDesc
        });

        await newCategory.save();

        res.status(201).json({
            success: true,
            message: 'Categoria creada',
            data: newCategory     
        });
    } catch (error){
        console.error('Error en createCategory:', error);
        //manejo de errores de indice unico 
        if(error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe una categoria con ese nombre'
            });
        }
         // Error generico del servidor
         res.status(500).json({
            success: false,
            message: ' Error al crear categoria',
            error: error.message
         });     
    }
};

/**
 * GET consultar listado de cateforias
 * GET /api/categories
 * por defecto retorna solo las categorias activas
 * con includeInactive=true retorna todas las categorias incluyendo las inactivas
 * Ordena por descendente por fecha de creacion
 * retorna: 
 * 200: lista de categorias
 * 500: error de base de datos 
 */

exports.getCategories =async (req, res) => {
    //por defecto solo las categorias activas
    //IncludeInactive=true permite ver desactivadas
    const includeInactive = req.query.includeInactive === 'true';
    const activeFilter = includeInactive ? {} : {active: { $ne: false } };
    const categories = await Category.find(activeFilter).sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        data: categories
    });
};