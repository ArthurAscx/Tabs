const Sequelize = require('sequelize');
const sequelize = require('../database'); 

const cols = {
        idUserDisc: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		 traceId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: true
         },
         totalPrice:{
            type:Sequelize.DOUBLE
         },
         idUser:{
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         idDisc:{
            type: Sequelize.INTEGER,
            allowNull: false,
         }
}

const userDisc = sequelize.define("userDisc", cols, {
    tableName: "userDisc",
    timestamps: false
});

module.exports = userDisc;