const { findOneUser } = require("@/services/common/findOneUser");
const { findOneUserById } = require("@/services/common/findOneUserById");

const commonServices = { findOneUser, findOneUserById };

module.exports = { commonServices };
