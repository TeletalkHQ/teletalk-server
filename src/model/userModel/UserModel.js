const mongoose = require("mongoose");

const { UserSchema } = require("~/schema/userSchema/UserSchema");

const UserModel = mongoose.model("User", UserSchema, "users");

module.exports = { UserModel };
