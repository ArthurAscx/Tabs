const Sequelize = require('sequelize');
const sequelize = require('../database'); 

const cols = {
        idCategory: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		name: {
            type: Sequelize.STRING,
            defaultValue: "Placeholder Category",
            allowNull: false,
            unique: true
         }
}

const category = sequelize.define("Category", cols, {
    tableName: "category",
    timestamps: false
});

category.associate = (models)=>{
    category.hasMany(models.User, {
        as: "users",
        foreignKey: "idCategory"
    })
}
module.exports = category;