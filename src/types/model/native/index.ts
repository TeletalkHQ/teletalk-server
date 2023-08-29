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

export type NativeModelCollection = typeof nativeModels;

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
