const { DataTypes } = require("sequelize");
module.exports=(sequelize)=>{
    const instructor=sequelize.define('instructor',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        first_name:{
          type:DataTypes.STRING,
          allowNull: true
        },
        last_name:{
          type:DataTypes.STRING,
          allowNull: true
        },
        email:{
            type:DataTypes.STRING,
            allowNull: true
          },
        phone_number:{
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
      
    }, {
        tableName: 'instructors',
        timestamps: true
    });

    instructor.associate = (db) => {
        instructor.hasMany(db.department, { foreignKey: 'department_id', as: 'departments'})
    }

    return instructor;
}