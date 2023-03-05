import mongoose from "mongoose";

import { mongoModelBuilder } from "@/classes/MongoModelBuilder";

import { nativeModels } from "@/models/native";

import { mongooseUniqueValidator } from "@/plugins/mongoose";

mongoose.Schema.Types.String.checkRequired((v) => v !== null);

const userModels = nativeModels.user;
const commonModels = nativeModels.common;

const {
  bio,
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  online,
  phoneNumber,
  userId,
} = {
  bio: mongoModelBuilder
    .create()
    .setModel(userModels.bio)
    .type()
    .required()
    .minlength()
    .maxlength()
    .build(),
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
    .build(),
  phoneNumber: mongoModelBuilder
    .create()
    .setModel(userModels.phoneNumber)
    .type()
    .required()
    .minlength()
    .maxlength()
    .build(),
  status: mongoModelBuilder
    .create()
    .setModel(userModels.status)
    .type()
    .required()
    .defaultValue()
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
  online: mongoModelBuilder
    .create()
    .setModel(userModels.online)
    .type()
    .defaultValue()
    .required()
    .build(),
};

const UserSchema = new mongoose.Schema({
  bio,
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
  status: {
    online,
  },
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
    .build(),
});

UserSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model("User", UserSchema, "users");

export { User };
