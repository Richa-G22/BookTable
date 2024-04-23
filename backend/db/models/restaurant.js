'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.belongsTo( models.User, { foreignKey: 'ownerId'});
      Restaurant.belongsTo( models.User, { foreignKey: 'ownerId', as: "Owner" });
      Restaurant.hasMany( models.RestaurantImage, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
      Restaurant.hasMany( models.Holiday, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
      Restaurant.hasMany( models.Booking, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
      Restaurant.hasMany( models.Review, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
      Restaurant.hasMany( models.Slot, { foreignKey: 'restaurantId', onDelete: 'CASCADE' });
      Restaurant.hasMany( models.MenuDish, { foreignKey: 'restaurantId', onDelete: 'CASCADE' })
    }
  }
  Restaurant.init({
    restaurantType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    zipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        notNull: true,
        notEmpty: true,
        }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [1, 50]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
        len: [1, 1000]
      }
    },
    cuisines: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    locationMapUrl: {
      type: DataTypes.STRING,
    },
    dayClosed: {
      type: DataTypes.STRING,
    },
    hoursOfOperation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    avgMealPrice: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    parkingAvailability: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    paymentOption: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    dressCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    executiveChef: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      }
    },
    menuUrl: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Restaurant',
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt"]
      }
    }
  });
  return Restaurant;
};