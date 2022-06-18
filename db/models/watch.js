'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Watch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Watch.init({
    model_name: DataTypes.STRING,
    img: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Watch',
  });
  return Watch;
};