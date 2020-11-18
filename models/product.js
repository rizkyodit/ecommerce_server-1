'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Name Can't Be Empty!`
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please Insert Image!`
        },
        isUrl: {
          args: true,
          msg: `Please Insert Image Url!`
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Price Can't Be Empty!`
        },
        isNumeric: {
          args: true,
          msg: `Price Only Allow Number!`
        },
        min: {
          args: [1],
          msg: `Can't Put Price Lower Than 1`
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: `Please Insert Stock!`
        },
        isNumeric: {
          args: true,
          msg: `Stock Only Allow Number!`
        },
        min: {
          args: [0],
          msg: `Stock Can't Be Lower Than 0!`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};