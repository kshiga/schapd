var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {type: DataTypes.STRING, unique: true},
    password: {
        type: DataTypes.STRING,
        set:  function(v) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(v, salt);

            this.setDataValue('password', hash);
        }},
    dateJoined: DataTypes.DATE
  }, {
    associate: function(models) {
      User.hasMany(models.Shape)
    }
  })

  return User
}
