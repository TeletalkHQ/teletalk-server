import { model, Schema, SchemaDefinitionProperty } from "mongoose";

import { makeMongoSchemaValue } from "@/helpers/makeMongoSchemaValue";

import { nativeModels } from "@/models/native";

import { IUserDoc, IUserModel } from "@/types";

const bioMaker = makeMongoSchemaValue(nativeModels.bio);
const countryCodeMaker = makeMongoSchemaValue(nativeModels.countryCode);
const countryNameMaker = makeMongoSchemaValue(nativeModels.countryName);
const firstNameMaker = makeMongoSchemaValue(nativeModels.firstName);
const lastNameMaker = makeMongoSchemaValue(nativeModels.lastName);
const phoneNumberMaker = makeMongoSchemaValue(nativeModels.phoneNumber);
const userIdMaker = makeMongoSchemaValue(nativeModels.userId);
const usernameMaker = makeMongoSchemaValue(nativeModels.username);

//FIXME: Do something with unique property
const bio: SchemaDefinitionProperty = {
  maxlength: bioMaker("maxlength"),
  minlength: bioMaker("minlength"),
  // required: bioMaker("required"),
  trim: nativeModels.bio.trim.value,
  type: "string",
};

const countryCode: SchemaDefinitionProperty = {
  maxlength: countryCodeMaker("maxlength"),
  minlength: countryCodeMaker("minlength"),
  // required: countryCodeMaker("required"),
  type: "string",
};

const createdAt: SchemaDefinitionProperty = {
  // required: nativeModels.createdAt.required.value,
  type: "number",
};

const countryName: SchemaDefinitionProperty = {
  maxlength: countryNameMaker("maxlength"),
  minlength: countryNameMaker("minlength"),
  // required: countryNameMaker("required"),
  type: "string",
};

const firstName: SchemaDefinitionProperty = {
  maxlength: firstNameMaker("maxlength"),
  minlength: firstNameMaker("minlength"),
  // required: firstNameMaker("required"),
  trim: nativeModels.firstName.trim.value,
  type: "string",
};

const isActive: SchemaDefinitionProperty = {
  default: nativeModels.isActive.defaultValue.value as boolean,
  // required: [
  // nativeModels.isActive.required.value,
  // nativeModels.isActive.required.error.reason,
  // ],
  type: "boolean",
};

const lastName: SchemaDefinitionProperty = {
  maxlength: lastNameMaker("maxlength"),
  // required: lastNameMaker("required"),
  trim: nativeModels.lastName.trim.value,
  type: "string",
};

const phoneNumber: SchemaDefinitionProperty = {
  maxlength: phoneNumberMaker("maxlength"),
  minlength: phoneNumberMaker("minlength"),
  // required: phoneNumberMaker("required"),
  trim: nativeModels.firstName.trim.value,
  type: "string",
};

const session: SchemaDefinitionProperty = {
  // required: nativeModels.session.required.value,
  type: "string",
};

const userId: SchemaDefinitionProperty = {
  maxlength: userIdMaker("maxlength"),
  minlength: userIdMaker("minlength"),
  required: userIdMaker("required"),
  trim: nativeModels.userId.trim.value,
  type: "string",
  // unique: nativeModels.userId.unique.value,
};

const username: SchemaDefinitionProperty = {
  maxlength: usernameMaker("maxlength"),
  // required: usernameMaker("required"),
  trim: nativeModels.username.trim.value,
  type: "string",
  // unique: nativeModels.username.unique.value,
};

const userSchema = new Schema<IUserDoc, IUserModel>({
  bio,
  blacklist: [
    {
      userId,
    },
  ],
  contacts: [
    {
      firstName,
      lastName,
      userId,
      countryCode: { ...countryCode, required: false },
      countryName: { ...countryName, required: false },
      phoneNumber: { ...phoneNumber, required: false },
    },
  ],
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  phoneNumber,
  sessions: [
    {
      session,
    },
  ],
  status: {
    isActive,
  },
  userId,
  username,
});

Schema.Types.String.checkRequired((v) => v !== null);

const UserModel = model<IUserDoc, IUserModel>("User", userSchema, "users");

export { UserModel as User };

// userSchema.post("save", function (error: any, doc: any, next: any) {
//   if (error.name === "MongoError" && error.code === 11000) {
//     next(new Error("user_exists"));
//   } else {
//     next();
//   }
// });
