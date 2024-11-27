const { DataTypes } = require("sequelize");
module.exports=(sequelize)=>{
    const student=sequelize.define('student',{
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
        enrollment_year:{
            type:DataTypes.INTEGER,
            allowNull: true
        },
        program_id:{
            type: DataTypes.UUID,
            references: {
                model: 'programs',
                key: 'id',
            },
            allowNull: true
        },
      
    }, {
        tableName: 'students',
        timestamps: true
    });

    student.associate = (db) => {
        student.hasMany(db.program, { foreignKey: 'program_id', as: 'programs'})
    }

    return student;
}