import { nativeModels } from "@/models/native";

import { Field, NativeModel, NativeModelKey } from "@/types";

import { utilities } from "@/utilities";

//TODO: Add more support like trim and required
function makeMongoSchemaValue(fieldName: Field) {
  return function <T extends NativeModelKey>(
    prop: T
  ): [NativeModel[T], string] {
    return [
      nativeModels[fieldName][prop],
      utilities.makeErrorReason(fieldName, prop),
    ];
  };
}

export { makeMongoSchemaValue };
