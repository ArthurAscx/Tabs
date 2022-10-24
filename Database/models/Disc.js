const Sequelize = require('sequelize');
const sequelize = require('../database'); 

const cols = {
        idDisc: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		title:{
            type: Sequelize.STRING,
            defaultValue: "Disc Name",
            allowNull: false,
         },
         price:{
            type: Sequelize.DOUBLE,
            defaultValue: 25,
            allowNull: false,
         },
         artwork:{
            type: Sequelize.STRING,
            allowNull: false,
         },
         sales:{
            type: Sequelize.INTEGER,
            allowNull: false,
         },
         releaseYear:{
            type: Sequelize.DATEONLY,
            allowNull: false
         },
         description:{
            type: Sequelize.TEXT,
            allowNull: false
         },
         idArtist:{
            type:Sequelize.INTEGER
         },
         idGenre:{
            type:Sequelize.INTEGER
         }
}

const Disc = sequelize.define("Disc", cols, {
    tableName: "Disc",
    timestamps: false
});

module.exports = Disc;