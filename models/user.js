module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        Name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    User.associate = function(models){
        User.hasMany(models.Message, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return User;
};