module.exports = function(sequelize, DataTypes) {
    var Instance = sequelize.define("Instance", {
        textNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateToBeSent: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timeToBeSent: {
            type: DataType.STRING,
            allowNull: false,
        },
        textMessage: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Instance;
  };