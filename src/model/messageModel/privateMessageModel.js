const mongoose = require("mongoose");

const {
	PrivateMessageSchema,
} = require("~/schema/dbSchema/messageSchema/PrivateMessageSchema");

const UserModel = mongoose.model("PrivateMessage", PrivateMessageSchema, "privateMessages");

module.exports = { UserModel };
