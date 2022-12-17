const { findUser } = require("@/services/common/findUser");
const { findUserById } = require("@/services/common/findUserById");

const commonServices = { findUser, findUserById };

module.exports = { commonServices };
