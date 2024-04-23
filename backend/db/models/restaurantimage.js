'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RestaurantImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      RestaurantImage.belongsTo( models.Restaurant, { foreignKey: 'RestaurantId' });
    }
  }
  RestaurantImage.init({
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    restaurantUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: ''
    },
  }, {
    sequelize,
    modelName: 'RestaurantImage',
    defaultScope: {
      attributes: {
        exclude: [ "createdAt", "updatedAt"]
      }
    }
  });
  return RestaurantImage;
};