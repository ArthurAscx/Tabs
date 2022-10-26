const Sequelize = require('sequelize');
const sequelize = require('../database'); 

const cols = {
        idGenre: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		name: {
            type: Sequelize.STRING,
            defaultValue: "Placeholder Genre",
            allowNull: false,
            unique: true
         }
}

const Genre = sequelize.define("Genre", cols, {
    tableName: "genre",
    timestamps: false
});

Genre.associate = (models)=>{
    Genre.hasMany(models.Disc, {
        as: "discs",
        foreignKey: "idGenre"
    }),
    Genre.hasMany(models.Artist, {
        as: "Artists",
        foreignKey: "idGenre"
    })
}

module.exports = Genre;