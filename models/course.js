const { DataTypes } = require("sequelize");
module.exports=(sequelize)=>{
    const course=sequelize.define('course',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        course_name:{
          type:DataTypes.STRING,
          allowNull: true
        },
        credits:{
            type:DataTypes.INTEGER,
            allowNull: true
        },
        semester:{
            type: DataTypes.ENUM('I','II','III','IV','V','VI','VII','VIII','IX','X'),
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
        area_id:{
            type: DataTypes.UUID,
            references: {
                model: 'areas',
                key: 'id',
            },
            allowNull: true
        },
      
    }, {
        tableName: 'courses',
        timestamps: true
    });

    course.associate = (db) => {
        course.hasMany(db.program, { foreignKey: 'program_id', as: 'programs'})
        course.hasMany(db.area, { foreignKey: 'area_id', as: 'areas'})
    }

    return course;
}