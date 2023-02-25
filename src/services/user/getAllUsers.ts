const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { models } = require("@/models");

const getAllUsers = serviceBuilder
  .create()
  .body(async () => {
    return await models.database.mongoDb.User.find();
  })
  .build();

module.exports = { getAllUsers };
