const httpStatus = require('http-status');
// const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
// const { userService } = require('../services');
const { donationService } = require('../services');

const createDonation = catchAsync(async (req, res) => {
  const donation = await donationService.createDonation(req.body);
  res.status(httpStatus.CREATED).send(donation);
});

/*
const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});
*/

const getDonations = catchAsync(async (req, res) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await donationService.queryDonations();
  res.send(result);
});

const getDonationById = catchAsync(async (req, res) => {
  const donation = await donationService.getDonationById(req.params.donationId);
  if (!donation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'donation not found');
  }
  res.send(donation);
});

const updateDonation = catchAsync(async (req, res) => {
  const donation = await donationService.updateDonationById(req.params.donationId, req.body);
  res.send(donation);
});

const deleteDonation = catchAsync(async (req, res) => {
  await donationService.deleteDonationById(req.params.donationId);
  res.status(httpStatus.NO_CONTENT).send();
});

const getDonationByDate = catchAsync(async (req, res) => {
  const donation = await donationService.queryDonationsByDate(req.params.start, req.params.end);
  if (!donation) {
    throw new ApiError(httpStatus.NOT_FOUND, 'donation not found');
  }
  res.send(donation);
});

module.exports = {
  createDonation,
  getDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  getDonationByDate,
};
