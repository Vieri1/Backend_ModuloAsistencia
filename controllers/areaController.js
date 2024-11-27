const { area } = require('../db_connection');

const createAreaController = async ({ area_name, description }) => {
  try {
    const newarea= await area.create({area_name, description});
    return newarea || null
  } catch (error) {
    console.error({message:"Error en el Controlador al Crear el area",data:error});
    return false;
  }
};
const updateAreaController=async (id,{area_name,description}) => {
    try {
        const response=await getAreaController(id)
        if(response)
            await response.update({
                area_name,
                description
        })
        return response || null
    } catch (error) {
        console.error({message:'Error al modificar el area',data:error});
        return false
        
    }
}
const getAreaController=async (id) => {
    try {
        const response=await area.findByPk(id);
        return response || null
    } catch (error) {
        console.error({message:'Error en el Controlador al traer un area',data:error});
        return false
    }
}
const getAllAreaController=async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response=await area.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']] 
        })
    return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error({ message: "Error en el controlador al traer todos las Areas", data: error });
        return false;
    }
}

module.exports={
    createAreaController,
    getAreaController,
    getAllAreaController,
    updateAreaController
}