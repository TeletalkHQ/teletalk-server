const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { models } = require("@/models");

const findPrivateChat = serviceBuilder
  .create()
  .body(async (data) => {
    return await models.database.mongoDb.PrivateChat.find(data);
  })
  .build();

module.exports = { findPrivateChat };
