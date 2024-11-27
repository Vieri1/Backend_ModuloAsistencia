const { DataTypes } = require("sequelize");
module.exports=(sequelize)=>{
    const staff=sequelize.define('staff',{
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
        position:{
            type:DataTypes.STRING,
            allowNull: true
        }

    }, {
        tableName: 'staffs',
        timestamps: true
    });
    return staff;
}