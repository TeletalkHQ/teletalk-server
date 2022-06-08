const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const { mongoModelBuilder } = require("@/functions/helpers/Builders");

const {
  userModels: {
    bioModel: { version: _0, ...bioModel },
    countryCodeModel: { version: _1, ...countryCodeModel },
    countryNameModel: { version: _2, ...countryNameModel },
    createdAtModel: { version: _3, ...createdAtModel },
    firstNameModel: { version: _4, ...firstNameModel },
    lastNameModel: { version: _5, ...lastNameModel },
    phoneNumberModel: { version: _6, ...phoneNumberModel },
    tokenModel: { version: _7, ...tokenModel },
    usernameModel: { version: _8, ...usernameModel },
  },
} = require("@/models/userModels/userModels");

const {
  commonModels: {
    privateIdCommonModel,
    chatIdCommonModel,
    messageIdCommonModel,
  },
} = require("@/models/commonModels/commonModels");

//TODO: Move to configs
uniqueValidator.defaults.message = "{PATH}_exist";

const {
  bio,
  chatId,
  countryCode,
  countryName,
  createdAt,
  firstName,
  // lastMessage,
  lastName,
  mainToken,
  phoneNumber,
  privateId,
  username,
} = {
  bio: mongoModelBuilder
    .create()
    .setModelObject(bioModel)
    .type()
    .maxlength()
    .minlength()
    .build(),
  chatId: mongoModelBuilder
    .create()
    .setModelObject(chatIdCommonModel)
    .type()
    .maxlength()
    .minlength()
    .required()
    .trim()
    .build(),
  countryCode: mongoModelBuilder
    .create()
    .setModelObject(countryCodeModel)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  countryName: mongoModelBuilder
    .create()
    .setModelObject(countryNameModel)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  createdAt: mongoModelBuilder
    .create()
    .setModelObject(createdAtModel)
    .type()
    .defaultValue()
    .build(),
  firstName: mongoModelBuilder
    .create()
    .setModelObject(firstNameModel)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  lastMessage: mongoModelBuilder
    .create()
    .setModelObject(messageIdCommonModel)
    .type()
    .minlength()
    .maxlength()
    .build(),
  lastName: mongoModelBuilder
    .create()
    .setModelObject(lastNameModel)
    .type()
    .maxlength()
    .trim()
    .defaultValue()
    .build(),
  mainToken: mongoModelBuilder
    .create()
    .setModelObject(tokenModel)
    .type()
    .required()
    .unique()
    .build(),
  phoneNumber: mongoModelBuilder
    .create()
    .setModelObject(phoneNumberModel)
    .type()
    .maxlength()
    .minlength()
    .required()
    .build(),
  privateId: mongoModelBuilder
    .create()
    .setModelObject(privateIdCommonModel)
    .type()
    .minlength()
    .maxlength()
    .required()
    .unique()
    .trim()
    .build(),
  username: mongoModelBuilder
    .create()
    .setModelObject(usernameModel)
    .type()
    .trim()
    .maxlength()
    .defaultValue()
    .lowercase()
    .build(),
  // validate: {
  // 	validator: function (value) {
  // 		return /^[a-z\s]{0,255}$/i.test(value);
  // 	},
  // 	message: "{VALUE} is not a valid string!",
  // },
};

// uniqueValidator.defaults.type = "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  bio,
  blacklist: [
    {
      countryCode,
      countryName,
      phoneNumber,
    },
  ],
  chats: [
    {
      chatId,
    },
  ],
  contacts: [
    {
      countryCode,
      countryName,
      firstName,
      lastName,
      phoneNumber,
      privateId: {
        ...(() => {
          const { unique, ...rest } = privateId;
          return rest;
        })(),
      },
    },
  ],
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  phoneNumber,
  privateId,
  tokens: [
    {
      mainToken,
    },
  ],
  username, //TODO UserStatus here =>
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

UserSchema.plugin(uniqueValidator);

const UserMongoModel = mongoose.model("User", UserSchema, "users");

module.exports = { UserMongoModel };
