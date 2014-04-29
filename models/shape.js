module.exports = function(sequelize, DataTypes) {
  var Shape = sequelize.define('Shape', {
    id: DataTypes.INTEGER,
    info: DataTypes.TEXT
  }, {
    associate: function(models) {
      Shape.belongsTo(models.User)
    }
  })

  return Shape
}