module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
      firstName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      lastName: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      password: {
          type: DataType.STRING,
          allowNull: false,
      },
      phone: {
          type: DataTypes.STRING,
          allowNull: false,
      }

    
  });
  return Post;
};