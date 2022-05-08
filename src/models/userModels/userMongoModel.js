const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const {
  mongooseSchemaPropertyGenerator,
} = require("@/functions/utilities/generators");
const { skipParams } = require("@/functions/utilities/utilsNoDeps");

const {
  userModels: {
    bioModel,
    countryCodeModel,
    countryNameModel,
    createdAtModel,
    firstNameModel,
    lastNameModel,
    phoneNumberModel,
    tokenModel,
    usernameModel,
  },
} = require("@/models/userModels/userModels");

const {
  commonModels: {
    privateIdCommonModel,
    chatIdCommonModel,
    messageIdCommonModel,
  },
} = require("@/models/commonModels/commonModels");

uniqueValidator.defaults.message = "{PATH}_exist";

const user = {
  bio: mongooseSchemaPropertyGenerator(bioModel.type.value, [
    bioModel.maxlength.value,
    bioModel.maxlength.error.message,
  ]),

  chatId: mongooseSchemaPropertyGenerator(
    chatIdCommonModel.type.value,
    [
      chatIdCommonModel.maxlength.value,
      chatIdCommonModel.maxlength.error.message,
    ],
    [
      chatIdCommonModel.minlength.value,
      chatIdCommonModel.minlength.error.message,
    ],
    [
      chatIdCommonModel.required.value,
      chatIdCommonModel.required.error.message,
    ],
    null,
    chatIdCommonModel.trim.value
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
    messageIdCommonModel.type.value,
    [
      messageIdCommonModel.minlength.value,
      messageIdCommonModel.minlength.error.message,
    ],
    [
      messageIdCommonModel.maxlength.value,
      messageIdCommonModel.maxlength.error.message,
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
  privateId: mongooseSchemaPropertyGenerator(
    privateIdCommonModel.type.value,
    [
      privateIdCommonModel.maxlength.value,
      privateIdCommonModel.maxlength.error.message,
    ],
    [
      privateIdCommonModel.minlength.value,
      privateIdCommonModel.minlength.error.message,
    ],
    [
      privateIdCommonModel.required.value,
      privateIdCommonModel.required.error.message,
    ],
    privateIdCommonModel.unique.value,
    privateIdCommonModel.trim.value
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
      privateId: {
        ...(() => {
          const { unique, ...rest } = user.privateId;

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

  privateId: user.privateId,

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
