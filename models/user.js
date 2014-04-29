module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {type: DataTypes.INTEGER, unique: true},
    firstname: {type: DataTypes.STRING},
    lastname: {type: DataTypes.STRING},
    picture: {type: DataTypes.STRING},
    dateJoined: DataTypes.DATE
  }, {
    associate: function(models) {
      User.hasMany(models.Shape)
    }
  })

  return User
}
