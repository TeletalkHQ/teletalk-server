const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const {
  mongooseSchemaPropertyGenerator,
} = require("~/functions/utilities/generators");
const { skipParams } = require("~/functions/utilities/utilsNoDeps");

const {
  userModel: {
    properties: {
      bioModel: { properties: bioModel },
      countryCodeModel: { properties: countryCodeModel },
      countryNameModel: { properties: countryNameModel },
      createdAtModel: { properties: createdAtModel },
      firstNameModel: { properties: firstNameModel },
      lastNameModel: { properties: lastNameModel },
      phoneNumberModel: { properties: phoneNumberModel },
      tokenModel: { properties: tokenModel },
      usernameModel: { properties: usernameModel },
    },
  },
} = require("~/models/userModels/userModel");

const {
  commonModel: {
    properties: {
      commonPrivateIdModel: { properties: commonPrivateIdModel },
      commonChatIdModel: { properties: commonChatIdModel },
      commonMessageIdModel: { properties: commonMessageIdModel },
    },
  },
} = require("~/models/commonModels/commonModel");

uniqueValidator.defaults.message = "{PATH}_exist";

const user = {
  bio: mongooseSchemaPropertyGenerator(bioModel.type.value, [
    bioModel.maxlength.value,
    bioModel.maxlength.error.message,
  ]),

  chatId: mongooseSchemaPropertyGenerator(
    commonChatIdModel.type.value,
    [
      commonChatIdModel.maxlength.value,
      commonChatIdModel.maxlength.error.message,
    ],
    [
      commonChatIdModel.minlength.value,
      commonChatIdModel.minlength.error.message,
    ],
    [
      commonChatIdModel.required.value,
      commonChatIdModel.required.error.message,
    ],
    null,
    commonChatIdModel.trim.value
  ),
  countryCode: mongooseSchemaPropertyGenerator(
    countryCodeModel.type.value,
    [
      countryCodeModel.maxlength.value,
      countryCodeModel.maxlength.error.message,
    ],
    [
      countryCodeModel.minlength.value,
      countryCodeModel.minlength.error.message,
    ],
    [countryCodeModel.required.value, countryCodeModel.required.error.message]
  ),
  countryName: mongooseSchemaPropertyGenerator(
    countryNameModel.type.value,
    [
      countryNameModel.maxlength.value,
      countryNameModel.maxlength.error.message,
    ],
    [
      countryNameModel.minlength.value,
      countryNameModel.minlength.error.message,
    ],
    [countryNameModel.required.value, countryNameModel.required.error.message]
  ),
  createdAt: mongooseSchemaPropertyGenerator(
    createdAtModel.type.value,
    ...skipParams(5),
    createdAtModel.default.value
  ),
  firstName: mongooseSchemaPropertyGenerator(
    firstNameModel.type.value,
    [firstNameModel.maxlength.value, firstNameModel.maxlength.error.message],
    [firstNameModel.minlength.value, firstNameModel.minlength.error.message],
    [firstNameModel.required.value, firstNameModel.required.error.message]
  ),
  lastName: mongooseSchemaPropertyGenerator(
    lastNameModel.type.value,
    [lastNameModel.maxlength.value, lastNameModel.maxlength.error.message],
    ...skipParams(3),
    lastNameModel.trim.value,
    lastNameModel.default.value
  ),
  lastMessage: mongooseSchemaPropertyGenerator(
    commonMessageIdModel.type.value,
    [
      commonMessageIdModel.minlength.value,
      commonMessageIdModel.minlength.error.message,
    ],
    [
      commonMessageIdModel.maxlength.value,
      commonMessageIdModel.maxlength.error.message,
    ]
  ),
  phoneNumber: mongooseSchemaPropertyGenerator(
    phoneNumberModel.type.value,
    [
      phoneNumberModel.maxlength.value,
      phoneNumberModel.maxlength.error.message,
    ],
    [
      phoneNumberModel.minlength.value,
      phoneNumberModel.minlength.error.message,
    ],
    [phoneNumberModel.required.value, phoneNumberModel.required.error.message]
  ),
  privateID: mongooseSchemaPropertyGenerator(
    commonPrivateIdModel.type.value,
    [
      commonPrivateIdModel.maxlength.value,
      commonPrivateIdModel.maxlength.error.message,
    ],
    [
      commonPrivateIdModel.minlength.value,
      commonPrivateIdModel.minlength.error.message,
    ],
    [
      commonPrivateIdModel.required.value,
      commonPrivateIdModel.required.error.message,
    ],
    commonPrivateIdModel.unique.value,
    commonPrivateIdModel.trim.value
  ),
  token: mongooseSchemaPropertyGenerator(
    tokenModel.type.value,
    ...skipParams(2),
    [tokenModel.required.value, tokenModel.required.error.message],
    tokenModel.unique.value
  ),
  username: mongooseSchemaPropertyGenerator(
    usernameModel.type.value,
    [usernameModel.maxlength.value, usernameModel.maxlength.error.message],
    ...skipParams(3),
    usernameModel.trim.value,
    usernameModel.default.value,
    usernameModel.lowercase.value
    // validate: {
    // 	validator: function (value) {
    // 		return /^[a-z\s]{0,255}$/i.test(value);
    // 	},
    // 	message: "{VALUE} is not a valid string!",
    // },
  ),
};

// uniqueValidator.defaults.type = "mongoose-unique-validator";

const UserSchema = new mongoose.Schema({
  bio: user.bio,

  blacklist: [
    {
      countryCode: user.countryCode,
      countryName: user.countryName,
      phoneNumber: user.phoneNumber,
    },
  ],

  chats: [{ chatId: user.chatId }],

  contacts: [
    {
      countryCode: user.countryCode,
      countryName: user.countryName,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      privateID: {
        ...(() => {
          const { unique, ...rest } = user.privateID;

          return rest;
        })(),
      },
    },
  ],

  countryCode: user.countryCode,

  countryName: user.countryName,

  createdAt: user.createdAt,

  firstName: user.firstName,

  lastName: user.lastName,

  phoneNumber: user.phoneNumber,

  privateID: user.privateID,

  tokens: [
    {
      token: user.token,
    },
  ],

  username: user.username, //TODO UserStatus here =>
});

// UserRegisterSchema.post("save", function (error, doc, next) {
// 	const keys = {};
// 	Object.keys(error).forEach((key) => (keys[key] = error[key]));
// 	logger.log(keys, "171474147414741474114741147414741474");
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
