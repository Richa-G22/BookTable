'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo (models.Restaurant, { foreignKey: 'restaurantId' });
      Booking.belongsTo (models.User, { foreignKey: 'userId' });
      //Booking.hasOne (models.Slot, { foreignKey: 'bookingId' });
      Booking.belongsTo( models.Slot, { foreignKey: 'slotId' });
    }
  }
  Booking.init({
    restaurantId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,  
    },
    slotId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    bookingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Booking',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Booking;
};


