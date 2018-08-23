module.exports = function(sequelize, DataTypes){
    var Message = sequelize.define("Message", {
        body: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        sendTime: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    
    Message.associate = function(models){
        Message.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Message;
};