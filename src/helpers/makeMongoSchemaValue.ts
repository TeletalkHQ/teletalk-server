import { NativeModel, NativeModelKey } from "@/types";

function makeMongoSchemaValue(prop: NativeModel) {
  return function <T extends NativeModelKey>(
    key: T
  ): [NativeModel[T]["value"], string] {
    return [prop[key].value, prop[key].error?.reason as string];
  };
}

export { makeMongoSchemaValue };
