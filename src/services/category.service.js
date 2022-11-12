const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');

// /**
//  * Check if email is taken
//  * @param {string} email - The user's email
//  * @returns {Promise<boolean>}
//  */
// const isEmailTaken = async function (email) {
//   const user = await db.users.findOne({ where: { email } });
//   logger.info(user);
//   return !!user;
// };

// /**
//  * Check if password matches the user's password
//  * @param {string} password
//  * @returns {Promise<boolean>}
//  */
// const isPasswordMatch = async function (password, user) {
//   const comp = bcrypt.compareSync(password, user.password);
//   logger.info(comp);
//   return comp;
// };

/**
 * Create a Category
 * @param {ObjectCategoryBody}
 * @returns {Promise<Category>}
 */
const createCategory = async (categoryBody) => {
  const categoryList = {
    ...categoryBody,
  };
  return db.categories.create(categoryList);
};
// Create a Category
// const category = req.body;

// Save Category in the database
//   db.categories.create(category)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(400).send(errorHandler(err));
//     });
// };

/**
 * Query for Categories
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */

/**
 * Get category by id
 * @param {ObjectId} id
 * @returns {Promise<Category>}
 */
const getCategory = async (id) => {
  return db.categories.findByPk(id);
};

const getCategories = async () => {
  const categories = await db.categories.findAll();
  return categories;
};
/**
 * Get category by campId
 * @param {string} email
 * @returns {Promise<Category>}
 */
// const getCategoryByCampaignName = async (campaignName) => {
//   return db.categories.findOne({ where: { campaignName } });
// };

/**
 * Update category by Id
 * @param {ObjectId} categoryId
 * @param {Object} updateBody
 * @returns {Promise<category>}
 */
const updateCategory = async (categoryId, updateBody) => {
  const category = await getCategory(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  Object.assign(category, updateBody);
  await db.categories.update(category.dataValues, { where: { id: categoryId } });
  return category;
};

/**
 * Delete category by id
 * @param {ObjectId} categoryId
 * @returns {Promise<Category>}
 */
const deleteCategory = async (categoryId) => {
  const category = await getCategory(categoryId);
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Category not found');
  }
  await db.categories.destroy({ where: { id: categoryId } });
  return category;
};

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  // getCategoryByCampaignName,
  updateCategory,
  deleteCategory,
};
