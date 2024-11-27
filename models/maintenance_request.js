const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const maintenance_request = sequelize.define('maintenance_request', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        request_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        state: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        assigned_to: {
            type: DataTypes.UUID, // Tipo debe coincidir con la clave referenciada
            references: {
                model: 'staffs', // Nombre de la tabla referenciada
                key: 'id', // Clave referenciada
            },
            allowNull: true,
        },
    }, {
        tableName: 'maintenance_requests',
        timestamps: true,
    });

    // Define la asociación
    maintenance_request.associate = (db) => {
        maintenance_request.hasMany(db.staff, {
            foreignKey: 'assigned_to',
            as: 'assignedStaff', // Alias para la relación

        });
    };

    return maintenance_request;
};
