const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { categoryService } = require('../services');

const createCategory = catchAsync(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  res.status(httpStatus.CREATED).send(category);
});

const getCategory = catchAsync(async (req, res) => {
  const category = await categoryService.getCategory(req.params.categoryId);
  if (!category) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      'Category with this id not found! You might want to check if your search is correct though.'
    );
  }
  res.send(category);
});

// const getCategoryByCampaignName = catchAsync(async (req, res) => {
//   // const category = await categoryService.getCategoryByCampaignId(req.params.campId);
//   const campaignName = await categoryService.getCategoryByCampaignName(req.params.campaignName);
//   if (!campaignName) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'This campaign does not exist and hence, category cannot be found!');
//   }
//   res.send(campaignName);
// });

const getCategories = catchAsync(async (req, res) => {
  const category = await categoryService.getCategories();
  if (!category) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No categories are found!');
  }
  res.send(category);
});

const updateCategory = catchAsync(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.categoryId, req.body);
  res.send(category);
});

const deleteCategory = catchAsync(async (req, res) => {
  await categoryService.deleteCategory(req.params.categoryId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  // getCategoryByCampaignName,
  updateCategory,
  deleteCategory,
};
