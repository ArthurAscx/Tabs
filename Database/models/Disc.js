const Sequelize = require("sequelize")
module.exports = (sequelize, DataTypes)=>{
const cols = {
        idDisc: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		title:{
            type: DataTypes.STRING,
            defaultValue: "Disc Name",
            allowNull: false,
         },
         price:{
            type: DataTypes.FLOAT(11,10),
            defaultValue: 25,
            allowNull: false,
         },
         artwork:{
            type: DataTypes.STRING,
            allowNull: false,
         },
         sales:{
            type: DataTypes.INTEGER,
            allowNull: false,
         },
         releaseYear:{
            type: DataTypes.INTEGER,
            allowNull: false
         },
         description:{
            type: DataTypes.TEXT,
            allowNull: false
         },
         idArtist:{
            type:DataTypes.INTEGER
         },
         idGenre:{
            type:DataTypes.INTEGER
         }
}

const Disc = sequelize.define("Disc", cols, {
    tableName: "disc",
    timestamps: false
});

Disc.Associate = (models) =>{
    Disc.belongsTo(models.Artist, {
        as: "artist",
        foreignKey: "idArtist"
    }),
    Disc.belongsTo(models.Genre, {
        as: "genre",
        foreignKey: "idGenre"
    })
}
return Disc;
}
