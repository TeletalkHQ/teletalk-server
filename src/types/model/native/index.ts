import { ScreamingSnakeCase } from "type-fest";

import { nativeModels } from "~/models/native";

export type FieldType =
  | "array"
  | "boolean"
  | "date"
  | "number"
  | "object"
  | "string";

export interface NativeModel {
  defaultValue?: any;
  empty?: boolean;
  length?: number;
  maxLength?: number;
  minLength?: number;
  numeric?: boolean;
  required?: boolean;
  trim?: boolean;
  type: FieldType;
  unique?: boolean;
}

export interface AvatarSrc extends NativeModel {
  type: "string";
  maxLength: 800000;
  minLength: 0;
  required: true;
  defaultValue: "";
  trim: true;
  empty: true;
}

export interface Bio extends NativeModel {
  type: "string";
  maxLength: 255;
  minLength: 0;
  required: true;
  defaultValue: "";
  trim: true;
  empty: true;
}

export interface Blacklist extends NativeModel {
  type: "array";
  required: true;
  empty: true;
}

export interface Contacts extends NativeModel {
  type: "array";
  required: true;
  empty: true;
}

export interface CountryCode extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 1;
  maxLength: 4;
  numeric: true;
  trim: true;
}

export interface CountryName extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 2;
  maxLength: 50;
  trim: true;
}

export interface FirstName extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 2;
  maxLength: 18;
  trim: true;
}

export interface IsActive extends NativeModel {
  type: "boolean";
  required: true;
  defaultValue: false;
}

export interface LastName extends NativeModel {
  type: "string";
  required: true;
  empty: true;
  minLength: 2;
  maxLength: 18;
  trim: true;
}

export interface MacAddress extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 12;
  maxLength: 16;
  trim: true;
  unique: true;
}

export interface PhoneNumber extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 10;
  maxLength: 14;
  numeric: true;
  unique: true;
}

export interface Sessions extends NativeModel {
  type: "array";
  required: true;
  empty: true;
}

export interface Status extends NativeModel {
  type: "object";
  required: true;
  defaultValue: object;
}

export interface Username extends NativeModel {
  type: "string";
  required: true;
  empty: true;
  minLength: 0;
  maxLength: 12;
  unique: false;
  trim: true;
}

export interface VerificationCode extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  length: 6;
  numeric: true;
  trim: true;
}

export interface ChatId extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 30;
  maxLength: 35;
  trim: true;
  unique: true;
}

export interface ClientId extends NativeModel {
  type: "string";
  empty: false;
  required: true;
  minLength: 100;
  maxLength: 150;
  unique: true;
  trim: true;
}

export interface CreatedAt extends NativeModel {
  type: "number";
  required: true;
  empty: false;
}

export interface MessageId extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  maxLength: 45;
  minLength: 40;
  trim: true;
  unique: true;
}

export interface Id extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 30;
  maxLength: 35;
  trim: true;
  unique: true;
}

export type UserId = Id;

export interface Messages extends NativeModel {
  type: "array";
  required: true;
  empty: true;
}

export interface MessageText extends NativeModel {
  type: "string";
  required: true;
  empty: false;
  minLength: 1;
  maxLength: 1000;
  trim: true;
}

export interface Participants extends NativeModel {
  type: "array";
  required: true;
  length: 2;
  empty: false;
}

export interface PrivateChats extends NativeModel {
  type: "array";
  required: true;
}

export type NativeModelCollection = typeof nativeModels;

export type Field = keyof NativeModelCollection;

export type NativeModelKey = keyof NativeModel;

type AllErrorKeys = {
  [T in keyof NativeModelCollection]: `${T}_${keyof NativeModelCollection[T] &
    string}_error`;
};

export type ModelErrorReason = ScreamingSnakeCase<
  AllErrorKeys[keyof AllErrorKeys] | `${keyof NativeModelCollection}_invalid`
>;

export type ModelPicker<T extends NativeModelKey> = Pick<
  NativeModel,
  Extract<NativeModelKey, T>
>;
