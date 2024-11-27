const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const schedule = sequelize.define('schedule', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        course_id: {
            type: DataTypes.UUID,
            references: {
                model: 'courses',
                key: 'id',
            },
            allowNull: true
        },
        instructor_id: {
            type: DataTypes.UUID,
            references: {
                model: 'instructors',
                key: 'id',
            },
            allowNull: true
        },
        day_of_week: {
            type: DataTypes.STRING,
            allowNull: true
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: true
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: true
        },



    }, {
        tableName: 'schedules',
        timestamps: true
    });

    schedule.associate = (db) => {
        schedule.hasMany(db.course, { foreignKey: 'course_id', as: 'courses'})
        schedule.hasMany(db.instructor, { foreignKey: 'instructor_id', as: 'instructors'})
    }

    return schedule;
}