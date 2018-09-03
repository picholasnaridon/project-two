var moment = require("moment");

module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    sendTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sent: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  Message.prototype.unixTime = function() {
    return moment(this.sendTime).unix();
  };
  Message.associate = function(models) {
    models.Message.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };
  return Message;
};
