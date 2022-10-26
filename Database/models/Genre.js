const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes)=>{
const cols = {
        idGenre: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		name: {
            type: DataTypes.STRING,
            defaultValue: "Placeholder Genre",
            allowNull: false,
            unique: true
         }
}

const Genre = sequelize.define("Genre", cols, {
    tableName: "genre",
    timestamps: false
});

Genre.Associate = (models)=>{
    Genre.hasMany(models.Disc, {
        as: "discs",
        foreignKey: "idGenre"
    }),
    Genre.hasMany(models.Artist, {
        as: "Artists",
        foreignKey: "idGenre"
    })
}
return Genre;
}
