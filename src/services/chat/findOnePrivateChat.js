const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { models } = require("@/models");

const findOnePrivateChat = serviceBuilder
  .create()
  .body(async (data) => {
    return await models.database.mongoDb.PrivateChat.findOne(data);
  })
  .build();

module.exports = { findOnePrivateChat };
