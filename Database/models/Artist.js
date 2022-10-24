const Sequelize = require('sequelize');
const sequelize = require('../database'); 

const cols = {
        idArtist: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		   name: {
            type: Sequelize.STRING,
            defaultValue: "Placeholder Band",
            allowNull: false,
         },
         idGenre:{
            type: Sequelize.INTEGER
         }
}

const artist = sequelize.define("Artist", cols, {
    tableName: "Artist",
    timestamps: false
});

module.exports = artist;