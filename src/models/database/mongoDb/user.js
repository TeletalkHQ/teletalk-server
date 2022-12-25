const mongoose = require("mongoose");

const { mongoModelBuilder } = require("@/classes/MongoModelBuilder");

const { nativeModels } = require("@/models/native");

const { mongooseUniqueValidator } = require("@/plugins/mongoosePlugins");

const userModels = nativeModels.user;
const commonModels = nativeModels.common;

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
    .setModelObject(userModels.bio)
    .type()
    .maxlength()
    .defaultValue()
    .build(),
  chatId: mongoModelBuilder
    .create()
    .setModelObject(commonModels.chatId)
    .type()
    .maxlength()
    .minlength()
    .required()
    .trim()
    .build(),
  countryCode: mongoModelBuilder
    .create()
    .setModelObject(userModels.countryCode)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  countryName: mongoModelBuilder
    .create()
    .setModelObject(userModels.countryName)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  createdAt: mongoModelBuilder
    .create()
    .setModelObject(userModels.createdAt)
    .type()
    .defaultValue()
    .build(),
  firstName: mongoModelBuilder
    .create()
    .setModelObject(userModels.firstName)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  lastName: mongoModelBuilder
    .create()
    .setModelObject(userModels.lastName)
    .type()
    .maxlength()
    .trim()
    .defaultValue()
    .build(),
  token: mongoModelBuilder
    .create()
    .setModelObject(userModels.token)
    .type()
    .required()
    .build(),
  phoneNumber: mongoModelBuilder
    .create()
    .setModelObject(userModels.phoneNumber)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  userId: mongoModelBuilder
    .create()
    .setModelObject(commonModels.userId)
    .type()
    .minlength()
    .maxlength()
    .required()
    .unique()
    .trim()
    .build(),
  username: mongoModelBuilder
    .create()
    .setModelObject(userModels.username)
    .type()
    .trim()
    .maxlength()
    //FIXME: default value should get one arg
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
  //FIXME: All arrays in db, same as contacts
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
