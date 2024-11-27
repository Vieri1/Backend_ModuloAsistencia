const {
    createAreaController,
    getAreaController,
    getAllAreaController,
    updateAreaController
} = require('../controllers/areaController');

const createAreaHandler = async (req, res) => {

    const { area_name, description } = req.body;
    const errores = [];
    if (!area_name) errores.push('El campo area es requerido');

    if (area_name && typeof area_name !== 'string') errores.push('El area debe ser una cadena de texto');

    if (!description) errores.push('El campo description es requerido');

    if (description && typeof description !== 'string') errores.push('La descripcion  debe ser una cadena de texto');

    if (errores.length > 0)
        res.status(404).json({ message: 'Se encontraron los Siguientes Errores', data: errores })
    try {
        const response = await createAreaController({ area_name, description });
        if (!response)
            return res.status(201).json({ message: 'Error al crear el crear Area', data: [] })
        return res.status(200).json({ message: 'Area creada Correctamente', data: response })
    } catch (error) {
        console.error({ message: 'Error en el Handler', data: error });
        return res.status(500).json({ message: 'Error Interno del servidor al Crear un Area' })

    }
}

const updateAreaHandler = async (req, res) => {
    const { id } = req.params
    const { area_name, description } = req.body;
    const errores = [];
    if (!area_name) errores.push('El campo area es requerido');

    if (area_name && typeof area_name !== 'string') errores.push('El area debe ser una cadena de texto');

    if (!description) errores.push('El campo description es requerido');

    if (description && typeof description !== 'string') errores.push('La descripcion  debe ser una cadena de texto');

    if (errores.length > 0)
        res.status(404).json({ message: 'Se encontraron los Siguientes Errores', data: errores })
    try {
        const response = await updateAreaController(id, { area_name, description });
        if (!response)
            return res.status(201).json({ message: 'Error al modificar el area', data: [] })
        return res.status(200).json({ message: 'Area Modificada con Exito', data: response })

    } catch (error) {
        console.error({ message: 'Error en el Handler al modificar', data: error });
        return res.status(500).json({ message: 'Error Interno del servidor al Modificar un Area' })
    }
};
const getAllAreaHandler = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const errores = [];

    if (isNaN(page)) errores.push("El page debe ser un número");
    if (page <= 0) errores.push("El page debe ser mayor a 0");
    if (isNaN(limit)) errores.push("El limit debe ser un número");
    if (limit <= 0) errores.push("El limit debe ser mayor a 0");

    if (errores.length > 0) {
        return res.status(400).json({ errores });
    }

    try {
        const response = await getAllAreaController(Number(page), Number(limit));
        if (response.data.length === 0) {
            return res.status(200).json({
                message: 'Ya no hay más Areas MC',
                data: {
                    data: [],
                    totalPage: response.currentPage,
                    totalCount: response.totalCount
                }
            });
        }

        return res.status(200).json({
            message: "Estados MC obtenidos correctamente",
            data: response,
        });
    } catch (error) {

    }
}
const getAreaHandler = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const newArea = await getAreaController(id);
        if (!newArea) {
            return res.status(404).json({ message: "newArea MC no encontrado" });
        }

        return res.status(200).json({ message: 'Area', data: newArea });
    } catch (error) {
        console.error("Error al obtener Area MC:", error);
        return res.status(500).json({ error: "Error interno del servidor al obtener el Area MC." });
    }
};

module.exports = {
    createAreaHandler,
    updateAreaHandler,
    getAllAreaHandler,
    getAreaHandler
}