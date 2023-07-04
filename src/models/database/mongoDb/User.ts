import { Schema, SchemaDefinitionProperty, model } from "mongoose";

import { makeMongoSchemaValue } from "~/helpers/makeMongoSchemaValue";
import { nativeModels } from "~/models/native";
import { IUserDoc, IUserModel } from "~/types/models";

const bioMaker = makeMongoSchemaValue("bio");
const countryCodeMaker = makeMongoSchemaValue("countryCode");
const countryNameMaker = makeMongoSchemaValue("countryName");
const firstNameMaker = makeMongoSchemaValue("firstName");
const lastNameMaker = makeMongoSchemaValue("lastName");
const phoneNumberMaker = makeMongoSchemaValue("phoneNumber");
const userIdMaker = makeMongoSchemaValue("userId");
const usernameMaker = makeMongoSchemaValue("username");

//FIXME: Do something with unique property
const bio: SchemaDefinitionProperty = {
  maxlength: bioMaker("maxLength"),
  minlength: bioMaker("minLength"),
  // required: bioMaker("required"),
  trim: nativeModels.bio.trim,
  type: "string",
};

const countryCode: SchemaDefinitionProperty = {
  maxlength: countryCodeMaker("maxLength"),
  minlength: countryCodeMaker("minLength"),
  // required: countryCodeMaker("required"),
  type: "string",
};

const createdAt: SchemaDefinitionProperty = {
  // required: nativeModels.createdAt.required ,
  type: "number",
};

const countryName: SchemaDefinitionProperty = {
  maxlength: countryNameMaker("maxLength"),
  minlength: countryNameMaker("minLength"),
  // required: countryNameMaker("required"),
  type: "string",
};

const firstName: SchemaDefinitionProperty = {
  maxlength: firstNameMaker("maxLength"),
  minlength: firstNameMaker("minLength"),
  // required: firstNameMaker("required"),
  trim: nativeModels.firstName.trim,
  type: "string",
};

const isActive: SchemaDefinitionProperty = {
  default: nativeModels.isActive.defaultValue as boolean,
  // required: [
  // nativeModels.isActive.required ,
  // nativeModels.isActive.required.error.reason,
  // ],
  type: "boolean",
};

const lastName: SchemaDefinitionProperty = {
  maxlength: lastNameMaker("maxLength"),
  // required: lastNameMaker("required"),
  trim: nativeModels.lastName.trim,
  type: "string",
};

const phoneNumber: SchemaDefinitionProperty = {
  maxlength: phoneNumberMaker("maxLength"),
  minlength: phoneNumberMaker("minLength"),
  // required: phoneNumberMaker("required"),
  trim: nativeModels.firstName.trim,
  type: "string",
};

const clientId: SchemaDefinitionProperty = {
  //TODO: Move clientId models from common to user
  // required: nativeModels.clientId.required ,
  type: "string",
};

const userId: SchemaDefinitionProperty = {
  maxlength: userIdMaker("maxLength"),
  minlength: userIdMaker("minLength"),
  required: userIdMaker("required"),
  trim: nativeModels.userId.trim,
  type: "string",
  // unique: nativeModels.userId.unique ,
};

const username: SchemaDefinitionProperty = {
  maxlength: usernameMaker("maxLength"),
  // required: usernameMaker("required"),
  trim: nativeModels.username.trim,
  type: "string",
  // unique: nativeModels.username.unique ,
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
      countryCode: { ...countryCode, required: false, minlength: 0 },
      countryName: { ...countryName, required: false, minlength: 0 },
      phoneNumber: { ...phoneNumber, required: false, minlength: 0 },
    },
  ],
  countryCode,
  countryName,
  createdAt,
  firstName,
  lastName,
  phoneNumber,
  clients: [
    {
      clientId,
    },
  ],
  status: {
    isActive,
  },
  userId,
  username,
});

//CLEANME: Remove
Schema.Types.String.checkRequired((v) => v !== null);

export const UserModel = model<IUserDoc, IUserModel>(
  "User",
  userSchema,
  "users"
);
