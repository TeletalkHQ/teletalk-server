import { Document, Model, model, Schema } from "mongoose";

import { nativeModels } from "@/models/native";

import { NativeModel, UserMongo } from "@/types";

interface IUserDoc extends UserMongo, Document {}
type IUserModel = Model<IUserDoc>;

const userNativeModel = nativeModels.user;

function makePropValue(prop: NativeModel) {
  return function <T extends keyof NativeModel>(
    key: T
  ): [NativeModel[T]["value"], string] {
    return [prop[key].value, prop[key].error?.reason as string];
  };
}

const bioMaker = makePropValue(userNativeModel.bio);
const countryCodeMaker = makePropValue(userNativeModel.countryCode);
const countryNameMaker = makePropValue(userNativeModel.countryName);
const firstNameMaker = makePropValue(userNativeModel.firstName);
const lastNameMaker = makePropValue(userNativeModel.lastName);
const phoneNumberMaker = makePropValue(userNativeModel.phoneNumber);
const userIdMaker = makePropValue(userNativeModel.userId);
const usernameMaker = makePropValue(userNativeModel.username);

const userSchema = new Schema<IUserDoc, IUserModel>({
  bio: {
    maxlength: bioMaker("maxlength"),
    minlength: bioMaker("minlength"),
    required: bioMaker("required"),
    trim: userNativeModel.bio.trim.value,
    type: String,
  },
  blacklist: [
    {
      countryCode: {
        maxlength: countryCodeMaker("maxlength"),
        minlength: countryCodeMaker("minlength"),
        required: countryCodeMaker("required"),
        type: String,
      },
      countryName: {
        maxlength: countryNameMaker("maxlength"),
        minlength: countryNameMaker("minlength"),
        required: countryNameMaker("required"),
        type: String,
      },
      phoneNumber: {
        maxlength: phoneNumberMaker("maxlength"),
        minlength: phoneNumberMaker("minlength"),
        required: phoneNumberMaker("required"),
        trim: userNativeModel.firstName.trim.value,
        type: String,
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
        type: String,
      },
      lastName: {
        // minlength: lastNameMaker("minlength"),
        maxlength: lastNameMaker("maxlength"),
        required: lastNameMaker("required"),
        trim: userNativeModel.lastName.trim.value,
        type: String,
      },
      userId: {
        maxlength: userIdMaker("maxlength"),
        minlength: userIdMaker("minlength"),
        required: userIdMaker("required"),
        trim: userNativeModel.userId.trim.value,
        type: String,
        unique: userNativeModel.userId.unique.value,
      },
    },
  ],
  countryCode: {
    maxlength: countryCodeMaker("maxlength"),
    minlength: countryCodeMaker("minlength"),
    required: countryCodeMaker("required"),
    type: String,
  },
  countryName: {
    maxlength: countryNameMaker("maxlength"),
    minlength: countryNameMaker("minlength"),
    required: countryNameMaker("required"),
    type: String,
  },
  createdAt: {
    required: userNativeModel.createdAt.required.value,
    type: Number,
  },
  firstName: {
    maxlength: firstNameMaker("maxlength"),
    minlength: firstNameMaker("minlength"),
    required: firstNameMaker("required"),
    trim: userNativeModel.firstName.trim.value,
    type: String,
  },
  lastName: {
    // minlength: lastNameMaker("minlength"),
    maxlength: lastNameMaker("maxlength"),
    required: lastNameMaker("required"),
    trim: userNativeModel.lastName.trim.value,
    type: String,
  },
  phoneNumber: {
    maxlength: phoneNumberMaker("maxlength"),
    minlength: phoneNumberMaker("minlength"),
    required: phoneNumberMaker("required"),
    trim: userNativeModel.firstName.trim.value,
    type: String,
  },
  sessions: [
    {
      token: {
        required: userNativeModel.token.required.value,
        type: String,
      },
    },
  ],
  status: {
    isOnline: {
      default: userNativeModel.online.defaultValue.value as boolean,
      type: Boolean,
      required: [
        userNativeModel.online.required.value,
        userNativeModel.online.required.error.reason,
      ],
    },
  },
  userId: {
    maxlength: userIdMaker("maxlength"),
    minlength: userIdMaker("minlength"),
    required: userIdMaker("required"),
    trim: userNativeModel.userId.trim.value,
    type: String,
    unique: userNativeModel.userId.unique.value,
  },
  username: {
    maxlength: usernameMaker("maxlength"),
    required: usernameMaker("required"),
    trim: userNativeModel.userId.trim.value,
    type: String,
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
