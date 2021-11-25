const mongoose = require("mongoose");

const { UserSchema } = require("~/schema/dbSchema/userDbSchema/UserDbSchema");

const UserModel = mongoose.model("User", UserSchema, "users");

module.exports = { UserModel };
