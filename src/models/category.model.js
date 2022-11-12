module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define('Category', {
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      trim: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      trim: true,
      //   unique: true,
    },
  });
  return Category;
};
