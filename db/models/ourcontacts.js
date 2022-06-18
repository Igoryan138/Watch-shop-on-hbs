'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ourContacts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ourContacts.init({
    adress: DataTypes.STRING,
    tel: DataTypes.STRING,
    wa: DataTypes.STRING,
    tlg: DataTypes.STRING,
    inst: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ourContacts',
  });
  return ourContacts;
};