const { serviceBuilder } = require("@/classes/service/ServiceBuilder");

const { User } = require("@/models/database/mongoDb/user");

const getAllUsers = serviceBuilder
  .create()
  .body(async () => {
    return await User.find();
  })
  .build();

module.exports = { getAllUsers };
