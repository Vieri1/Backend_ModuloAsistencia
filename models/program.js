const { DataTypes } = require("sequelize");
module.exports=(sequelize)=>{
    const program=sequelize.define('program',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        program_name:{
          type:DataTypes.STRING,
          allowNull: true
        },
        department_id:{
            type: DataTypes.UUID,
            references: {
                model: 'departments',
                key: 'id',
            },
            allowNull: true
        },
        degree_level:{
            type:DataTypes.INTEGER,
            allowNull: true
        }
      
    }, {
        tableName: 'programs',
        timestamps: true
    });

    program.associate = (db) => {
        program.hasMany(db.department, { foreignKey: 'department_id', as: 'departments'})
    }

    return program;
}