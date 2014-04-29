module.exports = function(sequelize, DataTypes) {
  var Shape = sequelize.define('Shape', {
    id: DataTypes.INTEGER,
    type: DataTypes.TEXT
  }, {
    associate: function(models) {
      Shape.belongsTo(models.User)
    }
  })

  return Shape
}