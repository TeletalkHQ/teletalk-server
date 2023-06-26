import { nativeModels } from "~/models/native";
import { NativeError } from "~/types";

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

export type NativeModelCollection = typeof nativeModels;

export type NativeModelKey = keyof NativeModel;

type AllErrorKeys = {
  [T in keyof NativeModelCollection]: `${T}_${keyof NativeModelCollection[T] &
    string}_error`;
};

export type ModelErrorReason =
  | AllErrorKeys[keyof AllErrorKeys]
  | `${keyof NativeModelCollection}_invalid`;

export type ModelErrorCollection = {
  [prop in ModelErrorReason]: NativeError;
};

export type ModelPicker<T extends NativeModelKey> = Pick<
  NativeModel,
  Extract<NativeModelKey, T>
>;
