const mongoose = require("mongoose");

const { PrivateChatSchema } = require("~/schema/dbSchema/chatSchema/PrivateChatSchema");

const PrivateChatModel = mongoose.model("PrivateChat", PrivateChatSchema, "privateChats");

module.exports = { PrivateChatModel };
