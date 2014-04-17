module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    dateJoined: DataTypes.DATE
  }, {
    associate: function(models) {
      User.hasMany(models.Shape)
    }
  })

  return User
}
