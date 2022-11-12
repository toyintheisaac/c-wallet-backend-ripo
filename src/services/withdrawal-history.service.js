const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { db } = require('../models');
// const logger = require('../config/logger');

/**
 * Create a user
 * @param {Object} body
 * @returns {Promise<User>}
 */
const createHistory = async (body) => {
  // eslint-disable-next-line no-param-reassign
  return db.withdrawal_history.create(body);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryHistory = async () => {
  const history = await db.withdrawal_history.findAll();
  return history;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getHistoryById = async (historyId) => {
  const findUser = await db.withdrawal_history.findOne({ where: { id: historyId } });
  return findUser;
};

/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateHistoryById = async (id, updateBody) => {
  const history = await getHistoryById(id);
  if (!history) {
    throw new ApiError(httpStatus.NOT_FOUND, 'History not found');
  }
  Object.assign(history, updateBody);
  await db.withdrawal_history.update(history.dataValues, { where: { id } });
  return history;
};

/**
 * Delete user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteHistoryById = async (id) => {
  const user = await getHistoryById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'History not found');
  }
  await db.withdrawal_history.destroy({ where: { id } });
  return user;
};

module.exports = {
  createHistory,
  queryHistory,
  getHistoryById,
  updateHistoryById,
  deleteHistoryById,
};
