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
    tableName: "Category",
    timestamps: false
});

module.exports = category;