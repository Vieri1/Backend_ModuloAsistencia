const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const attendance_record = sequelize.define('attendance_record', {
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
        schedule_id: {
            type: DataTypes.UUID,
            references: {
                model: 'schedules',
                key: 'id',
            },
            allowNull: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }

    }, {
        tableName: 'attendance_records',
        timestamps: true
    });
    attendance_record.associate = (db) => {
        attendance_record.hasMany(db.student, { foreignKey: 'student_id', as: 'students' })
        attendance_record.hasMany(db.course, { foreignKey: 'course_id', as: 'courses' })
        attendance_record.hasMany(db.schedule, { foreignKey: 'schedule_id', as: 'schedules' })
    }
    return attendance_record;
}