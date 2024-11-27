const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const event = sequelize.define('event', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        event_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        event_date: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },


    }, {
        tableName: 'events',
        timestamps: true
    });


    return event;
}