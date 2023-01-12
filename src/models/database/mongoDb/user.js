const mongoose = require("mongoose");

const { mongoModelBuilder } = require("@/classes/MongoModelBuilder");

const { nativeModels } = require("@/models/native");

const { mongooseUniqueValidator } = require("@/plugins/mongoose");

const userModels = nativeModels.user;
const commonModels = nativeModels.common;

const {
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  phoneNumber,
  userId,
} = {
  countryCode: mongoModelBuilder
    .create()
    .setModel(userModels.countryCode)
    .type()
    .required()
    .minlength()
    .maxlength()
    .build(),
  countryName: mongoModelBuilder
    .create()
    .setModel(userModels.countryName)
    .type()
    .required()
    .minlength()
    .maxlength()
    .build(),
  createdAt: mongoModelBuilder
    .create()
    .setModel(userModels.createdAt)
    .type()
    .required()
    .defaultValue()
    .build(),
  firstName: mongoModelBuilder
    .create()
    .setModel(userModels.firstName)
    .type()
    .required()
    .minlength()
    .maxlength()
    .build(),
  lastName: mongoModelBuilder
    .create()
    .setModel(userModels.lastName)
    .type()
    .required()
    .maxlength()
    .trim()
    .defaultValue()
    .build(),
  phoneNumber: mongoModelBuilder
    .create()
    .setModel(userModels.phoneNumber)
    .type()
    .required()
    .minlength()
    .maxlength()
    .build(),
  userId: mongoModelBuilder
    .create()
    .setModel(commonModels.userId)
    .type()
    .required()
    .minlength()
    .maxlength()
    .unique()
    .trim()
    .build(),
};

const UserSchema = new mongoose.Schema({
  bio: mongoModelBuilder
    .create()
    .setModel(userModels.bio)
    .type()
    .required()
    .maxlength()
    .defaultValue()
    .build(),
  blacklist: mongoModelBuilder
    .create()
    .setModel(userModels.blacklist)
    .type()
    .required()
    .items({
      countryCode,
      countryName,
      phoneNumber,
    })
    .build(),
  contacts: mongoModelBuilder
    .create()
    .setModel(userModels.contacts)
    .type()
    .required()
    .items({
      countryCode,
      countryName,
      firstName,
      lastName,
      phoneNumber,
      userId,
    })
    .build(),
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  phoneNumber,
  sessions: mongoModelBuilder
    .create()
    .setModel(userModels.sessions)
    .type()
    .required()
    .items({
      token: mongoModelBuilder
        .create()
        .setModel(userModels.token)
        .type()
        .required()
        .build(),
    })
    .build(),
  userId,
  username: mongoModelBuilder
    .create()
    .setModel(userModels.username)
    .type()
    .required()
    .maxlength()
    .trim()
    .defaultValue()
    .build(),
});

UserSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model("User", UserSchema, "users");

module.exports = {
  User,
};
