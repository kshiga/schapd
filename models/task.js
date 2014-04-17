module.exports = function(sequelize, DataTypes) {
  var Shape = sequelize.define('Shape', {
    id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    xMin: DataTypes.INTEGER,
    yMin: DataTypes.INTEGER,
    radius: DataTypes.INTEGER
  }, {
    associate: function(models) {
      Shape.belongsTo(models.User)
    }
  })

  return Shape
}