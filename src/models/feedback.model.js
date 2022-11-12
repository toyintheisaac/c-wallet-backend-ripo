const Sequelize = require('sequelize');
// const sequelize = require('../models/index');

module.exports = (sequelize, Sequelize) => {
  const Feedback = sequelize.define('Feedback', {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    campId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    message: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    file: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    // dateTime: {
    //   type: Sequelize.STRING,
    //   allowNull: false,
    //     unique: true,
    // },
  });
  return Feedback;
};
