const { dataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, dataTypes) =>{


const cols = {
        idArtist: {
           type: dataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		   name: {
            type: dataTypes.STRING,
            defaultValue: "Placeholder Band",
            allowNull: false,
         },
         idGenre:{
            type: dataTypes.INTEGER
         }
}

const artist = sequelize.define("artist", cols, {
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
return artist;
}