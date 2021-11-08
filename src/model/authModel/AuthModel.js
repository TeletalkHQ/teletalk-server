const mongoose = require("mongoose");

const { AuthSchema } = require("~/schema/authSchema/AuthSchema");

const AuthModel = mongoose.model("User", AuthSchema, "users");

module.exports = { AuthModel };
