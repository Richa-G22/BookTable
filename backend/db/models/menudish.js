'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuDish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MenuDish.belongsTo( models.Restaurant, { foreignKey: 'restaurantId'});
    }
  }
  MenuDish.init({
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dishCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishName: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dishIngredients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dishPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    dishCalories: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      }
    },
    dishAllergies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spiceLevel: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'MenuDish',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return MenuDish;
};