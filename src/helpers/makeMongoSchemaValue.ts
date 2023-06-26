import { nativeModels } from "~/models/native";
import { ErrorReason } from "~/types";
import { NativeModelCollection, NativeModelKey } from "~/types/models";
import { utils } from "~/utils";

//TODO: Add more support like trim and required
function makeMongoSchemaValue<P extends keyof NativeModelCollection>(
  fieldName: P
) {
  return function <F extends keyof NativeModelCollection[P]>(
    prop: F
  ): [NativeModelCollection[P][F], ErrorReason] {
    return [
      nativeModels[fieldName][prop],
      utils.makeModelErrorReason(fieldName, prop as NativeModelKey),
    ];
  };
}

export { makeMongoSchemaValue };
