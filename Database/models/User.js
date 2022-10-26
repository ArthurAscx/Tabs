module.exports = (sequelize,DataTypes)=>{

const cols = {
        idUser: {
           type: DataTypes.INTEGER,
           autoIncrement: true,
           primaryKey: true,
           allowNull: false,
           unique: true
        },
		   firstName:{
            type: DataTypes.STRING,
            defaultValue: "John",
            allowNull: false,
         },
         lastName:{
            type: DataTypes.STRING,
            defaultValue: "Doe",
            allowNull: false,
         },
         birthDate:{
            type: DataTypes.DATEONLY,
            allowNull: false,
         },
         email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
         },
         password:{
            type: DataTypes.STRING,
            allowNull: false
         },
         avatar:{
            type: DataTypes.STRING,
            allowNull: false
         },
         idCategory:{
            type: DataTypes.INTEGER
         }
}

const user = sequelize.define("user", cols, {
    tableName: "User",
    timestamps: false
});

user.Associate = (models)=>{
    user.belongsTo(models.Category, {
        as: "categories",
        foreignKey: "idCategory"
    })
}
return user;
}
