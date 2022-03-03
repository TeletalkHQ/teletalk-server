const mongoose = require("mongoose");

const {
  PrivateChatSchema,
} = require("~/schemas/databaseSchemas/chatsDatabaseSchemas/PrivateChatDatabaseSchema");

const PrivateChatModel = mongoose.model(
  "PrivateChat",
  PrivateChatSchema,
  "privateChats"
);

module.exports = { PrivateChatModel };
