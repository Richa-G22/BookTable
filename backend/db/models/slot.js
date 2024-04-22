'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Slot.belongsTo( models.Restaurant, { foreignKey: 'restaurantId' });
      // Slot.belongsTo( models.Booking );
      Slot.hasOne( models.Booking, { foreignKey: 'slotId' });
    }
  }
  Slot.init({
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    slotStartTime: {
      type: DataTypes.TIME,
      allowNull: false,
    }, 
    slotDuration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    tableCapacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }, 
    tableNum: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },  
  }, {
    sequelize,
    modelName: 'Slot',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Slot;
};