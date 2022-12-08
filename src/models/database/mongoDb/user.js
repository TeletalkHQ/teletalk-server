const mongoose = require("mongoose");

const { mongoModelBuilder } = require("@/classes/MongoModelBuilder");

const { mongooseUniqueValidator } = require("@/plugins/mongoosePlugins");

const { excludeVersions } = require("@/utilities/utilities");

const { nativeModels } = require("@/models/native");

const userModelsWithoutVersion = excludeVersions(nativeModels.user);
const commonModelsWithoutVersion = excludeVersions(nativeModels.common);

const {
  bio,
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  phoneNumber,
  token,
  userId,
  username,
} = {
  bio: mongoModelBuilder
    .create()
    .setModelObject(userModelsWithoutVersion.bio)
    .type()
    .maxlength()
    .defaultValue()
    .build(),
  chatId: mongoModelBuilder
    .create()
    .setModelObject(commonModelsWithoutVersion.chatId)
    .type()
    .maxlength()
    .minlength()
    .required()
    .trim()
    .build(),
  countryCode: mongoModelBuilder
    .create()
    .setModelObject(userModelsWithoutVersion.countryCode)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  countryName: mongoModelBuilder
    .create()
    .setModelObject(userModelsWithoutVersion.countryName)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  createdAt: mongoModelBuilder
    .create()
    .setModelObject(userModelsWithoutVersion.createdAt)
    .type()
    .defaultValue()
    .build(),
  firstName: mongoModelBuilder
    .create()
    .setModelObject(userModelsWithoutVersion.firstName)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  lastName: mongoModelBuilder
    .create()
    .setModelObject(userModelsWithoutVersion.lastName)
    .type()
    .maxlength()
    .trim()
    .defaultValue()
    .build(),
  token: mongoModelBuilder
    .create()
    .setModelObject(userModelsWithoutVersion.token)
    .type()
    .required()
    .build(),
  phoneNumber: mongoModelBuilder
    .create()
    .setModelObject(userModelsWithoutVersion.phoneNumber)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  userId: mongoModelBuilder
    .create()
    .setModelObject(commonModelsWithoutVersion.userId)
    .type()
    .minlength()
    .maxlength()
    .required()
    .unique()
    .trim()
    .build(),
  username: mongoModelBuilder
    .create()
    .setModelObject(userModelsWithoutVersion.username)
    .type()
    .trim()
    .maxlength()
    .defaultValue()
    .lowercase()
    .build(), // validate: {
  // 	validator: function (value) {
  // 		return /^[a-z\s]{0,255}$/i.test(value);
  // 	},
  // 	message: "{VALUE} is not a valid string!",
  // },
};

const UserSchema = new mongoose.Schema({
  bio,
  blacklist: [
    {
      countryCode,
      countryName,
      phoneNumber,
    },
  ],
  contacts: {
    type: nativeModels.user.contacts.type.value,
    items: {
      countryCode,
      countryName,
      firstName,
      lastName,
      phoneNumber,
      userId,
    },
  },
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  phoneNumber,
  userId,
  sessions: [
    {
      token,
    },
  ],
  username,
});

// UserRegisterSchema.post("save", function (error, doc, next) {
// 	const keys = {};
// 	Object.keys(error).forEach((key) => (keys[key] = error[key]));
// 	if (error.code === 11000) {
// 		next(new Error(error));
// 	} else {
// 		next(error);
// 	}
// });
//

UserSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model("User", UserSchema, "users");

module.exports = { User };
