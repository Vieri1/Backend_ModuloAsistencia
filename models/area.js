const { DataTypes } = require("sequelize");
module.exports=(sequelize)=>{
    const area=sequelize.define('area',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        area_name:{
          type:DataTypes.STRING,
          allowNull: true
        },
        description:{
          type:DataTypes.TEXT,
          allowNull: true
        }   
    }, {
        tableName: 'areas',
        timestamps: true
    });
    return area;
}