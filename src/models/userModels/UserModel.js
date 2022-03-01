const mongoose = require("mongoose");

const {
	UserSchema,
} = require("~/schemas/databaseSchemas/userDatabaseSchemas/UserDatabaseSchema");

const UserModel = mongoose.model("User", UserSchema, "users");

module.exports = { UserModel };
