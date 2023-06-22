import { validationModelBuilder } from "~/classes/modelBuilder/ValidationModelBuilder";
import { nativeModels } from "~/models/native";
import { commonValidationModels } from "~/models/validation/common";
import { ValidationPicker } from "~/types";

type UserValidationModels = ValidationPicker<
  | "bio"
  | "blacklist"
  | "clientId"
  | "clients"
  | "contacts"
  | "countryCode"
  | "countryName"
  | "firstName"
  | "isActive"
  | "lastName"
  | "macAddress"
  | "phoneNumber"
  | "status"
  | "userId"
  | "username"
  | "verificationCode"
>;

export const userValidationModels: UserValidationModels = {
  bio: validationModelBuilder
    .create("bio")
    .setModel(nativeModels.bio)
    .type()
    .required()
    .max()
    .build(),
  blacklist: validationModelBuilder
    .create("blacklist")
    .setModel(nativeModels.blacklist)
    .type()
    .required()
    .build(),
  clientId: validationModelBuilder
    .create("clientId")
    .setModel(nativeModels.clientId)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .build(),
  clients: validationModelBuilder
    .create("clients")
    .setModel(nativeModels.clients)
    .type()
    .required()
    .build(),
  contacts: validationModelBuilder
    .create("contacts")
    .setModel(nativeModels.contacts)
    .type()
    .required()
    .build(),
  countryCode: validationModelBuilder
    .create("countryCode")
    .setModel(nativeModels.countryCode)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .numeric()
    .trim()
    .build(),
  countryName: validationModelBuilder
    .create("countryName")
    .setModel(nativeModels.countryName)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .build(),
  firstName: validationModelBuilder
    .create("firstName")
    .setModel(nativeModels.firstName)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .build(),
  isActive: validationModelBuilder
    .create("isActive")
    .setModel(nativeModels.isActive)
    .type()
    .required()
    .build(),
  lastName: validationModelBuilder
    .create("lastName")
    .setModel(nativeModels.lastName)
    .type()
    .required()
    .min()
    .max()
    .trim()
    .build(),
  macAddress: validationModelBuilder
    .create("macAddress")
    .setModel(nativeModels.macAddress)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
  phoneNumber: validationModelBuilder
    .create("phoneNumber")
    .setModel(nativeModels.phoneNumber)
    .type()
    .required()
    .empty()
    .min()
    .max()
    .numeric()
    .build(),
  status: validationModelBuilder
    .create("status")
    .setModel(nativeModels.status)
    .type()
    .required()
    .build(),
  userId: commonValidationModels.id,
  username: validationModelBuilder
    .create("username")
    .setModel(nativeModels.username)
    .type()
    .required()
    .min()
    .max()
    .trim()
    .unique()
    .build(),
  verificationCode: validationModelBuilder
    .create("verificationCode")
    .setModel(nativeModels.verificationCode)
    .required()
    .empty()
    .length() // .max()
    .numeric()
    .trim()
    .type()
    .build(),
};
