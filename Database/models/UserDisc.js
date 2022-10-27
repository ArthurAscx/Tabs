const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes)=>{
const cols = {
        idUserDisc: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		 traceId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
         },
         totalPrice:{
            type:DataTypes.DOUBLE
         },
         idUser:{
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         idDisc:{
            type: DataTypes.INTEGER,
            allowNull: false,
         }
}

const userDisc = sequelize.define("userDisc", cols, {
    tableName: "userdisc",
    timestamps: false
});
return userDisc;
}
