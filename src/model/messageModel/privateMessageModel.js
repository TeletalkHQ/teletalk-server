const mongoose = require("mongoose");

const { PrivateMessageSchema } = require("~/schema/dbSchema/chatSchema/PrivateChatSchema");

const UserModel = mongoose.model("PrivateMessage", PrivateMessageSchema, "privateMessages");

module.exports = { UserModel };
