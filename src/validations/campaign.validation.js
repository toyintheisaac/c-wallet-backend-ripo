const Joi = require('joi');

const createCampaign = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    target: Joi.number().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.string().required(),
    accountNum: Joi.string().required(),
    accountName: Joi.string().required(),
    bankName: Joi.string().required(),
    launchDate: Joi.date().greater('now').required(),
    endDate: Joi.date().greater(Joi.ref('launchDate')).required(),
  }),
};

const getCampaign = {};

const queryCampaigns = {
  params: Joi.object().keys({
    campaignId: Joi.string().required(),
  }),
};

const updateCampaign = {
  params: Joi.object().keys({
    campaignId: Joi.required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      target: Joi.number(),
      location: Joi.string(),
      description: Joi.string(),
      images: Joi.string(),
      accountNum: Joi.string(),
      accountName: Joi.string(),
      bankName: Joi.string(),
    })
    .min(1),
};

const updateCampaignStatus = {
  params: Joi.object().keys({
    campaignId: Joi.string().required(),
    status: Joi.string().required().valid('pending', 'approved', 'disabled'),
  }),
};

const deleteCampaign = {
  params: Joi.object().keys({
    campaignId: Joi.string().required(),
  }),
};

module.exports = {
  createCampaign,
  getCampaign,
  queryCampaigns,
  updateCampaign,
  updateCampaignStatus,
  deleteCampaign,
};
