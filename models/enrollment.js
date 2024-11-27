const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const enrollment = sequelize.define('enrollment', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },

        student_id: {
            type: DataTypes.UUID,
            references: {
                model: 'students',
                key: 'id',
            },
            allowNull: true
        },
        course_id: {
            type: DataTypes.UUID,
            references: {
                model: 'courses',
                key: 'id',
            },
            allowNull: true
        },
        enrollment_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }

    }, {
        tableName: 'enrollments',
        timestamps: true
    });

    enrollment.associate = (db) => {
        enrollment.hasMany(db.student, { foreignKey: 'student_id', as: 'students' })
        enrollment.hasMany(db.course, { foreignKey: 'course_id', as: 'courses' })
    }

    return enrollment;
}