const express = require('express');
const campaignController = require('../../controllers/campaign.controller');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { campaignValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(campaignValidation.createCampaign), campaignController.createCampaign)
  .get(campaignController.getCampaigns);

router
  .route('/:campaignId')
  .get(validate(campaignValidation.getCampaign), campaignController.getCampaignById)
  .patch(auth(), validate(campaignValidation.updateCampaign), campaignController.updateCampaign)
  .delete(auth(), validate(campaignValidation.deleteCampaign), campaignController.deleteCampaign);

router
  .route('/:campaignId/:status')
  .patch(auth('admin'), validate(campaignValidation.updateCampaignStatus), campaignController.updateCampaignStatus);

module.exports = router;
