const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes)=>{

const cols = {
        idCategory: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		name: {
            type: DataTypes.STRING,
            defaultValue: "Placeholder Category",
            allowNull: false,
            unique: true
         }
}

const category = sequelize.define("Category", cols, {
    tableName: "category",
    timestamps: false
});

category.Associate = (models)=>{
    category.hasMany(models.User, {
        as: "users",
        foreignKey: "idCategory"
    })
}
return category;
}