const { DataTypes } = require("sequelize");
module.exports=(sequelize)=>{
    const department=sequelize.define('department',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        department_name:{
          type:DataTypes.STRING,
          allowNull: true
        },
        head_of_department: {
            type: DataTypes.UUID,
            references: {
                model: 'staffs', // Nombre de la tabla referenciada
                key: 'id', // Clave referenciada
            },
            allowNull: true,
        }  
    }, {
        tableName: 'departments',
        timestamps: true
    });
    department.associate = (db) => {
        department.belongsTo(db.staff, {
            foreignKey: 'head_of_department',
            as: 'head', // Alias para la relación
            unique:true
        });
    };
    return department;
}