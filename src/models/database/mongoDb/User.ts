import { Document, Model, model, Schema } from "mongoose";

import { makeMongoSchemaValue } from "@/helpers/makeMongoSchemaValue";

import { nativeModels } from "@/models/native";

import { UserMongo } from "@/types";

type IUserDoc = UserMongo & Document;
type IUserModel = Model<IUserDoc>;

const userNativeModel = nativeModels.user;

const bioMaker = makeMongoSchemaValue(userNativeModel.bio);
const countryCodeMaker = makeMongoSchemaValue(userNativeModel.countryCode);
const countryNameMaker = makeMongoSchemaValue(userNativeModel.countryName);
const firstNameMaker = makeMongoSchemaValue(userNativeModel.firstName);
const lastNameMaker = makeMongoSchemaValue(userNativeModel.lastName);
const phoneNumberMaker = makeMongoSchemaValue(userNativeModel.phoneNumber);
const userIdMaker = makeMongoSchemaValue(userNativeModel.userId);
const usernameMaker = makeMongoSchemaValue(userNativeModel.username);

const userSchema = new Schema<IUserDoc, IUserModel>({
  bio: {
    maxlength: bioMaker("maxlength"),
    minlength: bioMaker("minlength"),
    required: bioMaker("required"),
    trim: userNativeModel.bio.trim.value,
    type: "string",
  },
  blacklist: [
    {
      countryCode: {
        maxlength: countryCodeMaker("maxlength"),
        minlength: countryCodeMaker("minlength"),
        required: countryCodeMaker("required"),
        type: "string",
      },
      countryName: {
        maxlength: countryNameMaker("maxlength"),
        minlength: countryNameMaker("minlength"),
        required: countryNameMaker("required"),
        type: "string",
      },
      phoneNumber: {
        maxlength: phoneNumberMaker("maxlength"),
        minlength: phoneNumberMaker("minlength"),
        required: phoneNumberMaker("required"),
        trim: userNativeModel.firstName.trim.value,
        type: "string",
      },
    },
  ],
  contacts: [
    {
      firstName: {
        maxlength: firstNameMaker("maxlength"),
        minlength: firstNameMaker("minlength"),
        required: firstNameMaker("required"),
        trim: userNativeModel.firstName.trim.value,
        type: "string",
      },
      lastName: {
        // minlength: lastNameMaker("minlength"),
        maxlength: lastNameMaker("maxlength"),
        required: lastNameMaker("required"),
        trim: userNativeModel.lastName.trim.value,
        type: "string",
      },
      userId: {
        maxlength: userIdMaker("maxlength"),
        minlength: userIdMaker("minlength"),
        required: userIdMaker("required"),
        trim: userNativeModel.userId.trim.value,
        type: "string",
        unique: userNativeModel.userId.unique.value,
      },
    },
  ],
  countryCode: {
    maxlength: countryCodeMaker("maxlength"),
    minlength: countryCodeMaker("minlength"),
    required: countryCodeMaker("required"),
    type: "string",
  },
  countryName: {
    maxlength: countryNameMaker("maxlength"),
    minlength: countryNameMaker("minlength"),
    required: countryNameMaker("required"),
    type: "string",
  },
  createdAt: {
    required: userNativeModel.createdAt.required.value,
    type: "number",
  },
  firstName: {
    maxlength: firstNameMaker("maxlength"),
    minlength: firstNameMaker("minlength"),
    required: firstNameMaker("required"),
    trim: userNativeModel.firstName.trim.value,
    type: "string",
  },
  lastName: {
    // minlength: lastNameMaker("minlength"),
    maxlength: lastNameMaker("maxlength"),
    required: lastNameMaker("required"),
    trim: userNativeModel.lastName.trim.value,
    type: "string",
  },
  phoneNumber: {
    maxlength: phoneNumberMaker("maxlength"),
    minlength: phoneNumberMaker("minlength"),
    required: phoneNumberMaker("required"),
    trim: userNativeModel.firstName.trim.value,
    type: "string",
  },
  sessions: [
    {
      token: {
        required: userNativeModel.token.required.value,
        type: "string",
      },
    },
  ],
  status: {
    isOnline: {
      default: userNativeModel.online.defaultValue.value as boolean,
      required: [
        userNativeModel.online.required.value,
        userNativeModel.online.required.error.reason,
      ],
      type: "boolean",
    },
  },
  userId: {
    maxlength: userIdMaker("maxlength"),
    minlength: userIdMaker("minlength"),
    required: userIdMaker("required"),
    trim: userNativeModel.userId.trim.value,
    type: "string",
    unique: userNativeModel.userId.unique.value,
  },
  username: {
    maxlength: usernameMaker("maxlength"),
    required: usernameMaker("required"),
    trim: userNativeModel.userId.trim.value,
    type: "string",
    unique: userNativeModel.userId.unique.value,
  },
});

Schema.Types.String.checkRequired((v) => v !== null);
// UserSchema.plugin(mongooseUniqueValidator);

const UserModel = model<IUserDoc, IUserModel>("User", userSchema, "users");

export { UserModel as User };

// userSchema.post("save", function (error: any, doc: any, next: any) {
//   if (error.name === "MongoError" && error.code === 11000) {
//     next(new Error("user_exists"));
//   } else {
//     next();
//   }
// });
