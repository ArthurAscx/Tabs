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
    tableName: "artist",
    timestamps: false
});

artist.Associate = (models)=>{
    artist.hasMany(models.Disc, {
        as: "discs",
        foreignKey: "idArtist"
    }),
    artist.belongsTo(models.Genre, {
        as:"genre",
        foreignKey: "idGenre"
    })
}

module.exports = artist;