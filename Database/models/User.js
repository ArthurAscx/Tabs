const Sequelize = require('sequelize');
const sequelize = require('../database'); 

const cols = {
        idUser: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		   firstName:{
            type: Sequelize.STRING,
            defaultValue: "John",
            allowNull: false,
         },
         lastName:{
            type: Sequelize.STRING,
            defaultValue: "Doe",
            allowNull: false,
         },
         birthDate:{
            type: Sequelize.DATEONLY,
            allowNull: false,
         },
         email:{
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
         },
         password:{
            type: Sequelize.STRING,
            allowNull: false
         },
         avatar:{
            type: Sequelize.STRING,
            allowNull: false
         },
         idCategory:{
            type:Sequelize.INTEGER
         }
}

const user = sequelize.define("user", cols, {
    tableName: "User",
    timestamps: false
});

user.associate = (models)=>{
    user.belongsTo(models.Category, {
        as: "category",
        foreignKey: "idCategory"
    })
}

module.exports = user;