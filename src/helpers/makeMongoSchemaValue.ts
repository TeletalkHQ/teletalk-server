import { nativeModels } from "@/models/native";

import { NativeModelKey, NativeModelCollection, ErrorReason } from "@/types";

import { utilities } from "@/utilities";

//TODO: Add more support like trim and required
function makeMongoSchemaValue<P extends keyof NativeModelCollection>(
  fieldName: P
) {
  return function <F extends keyof NativeModelCollection[P]>(
    prop: F
  ): [NativeModelCollection[P][F], ErrorReason] {
    return [
      nativeModels[fieldName][prop],
      utilities.makeModelErrorReason(fieldName, prop as NativeModelKey),
    ];
  };
}

export { makeMongoSchemaValue };
