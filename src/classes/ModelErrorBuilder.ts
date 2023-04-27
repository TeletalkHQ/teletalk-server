import { errorBuilder } from "@/classes/ErrorBuilder";

import { nativeModels } from "@/models/native";

import {
  ErrorCollection,
  ErrorReason,
  Field,
  NativeModel,
  NativeModelKey,
} from "@/types";

import { utilities } from "@/utilities";

class ModelErrorBuilder {
  build() {
    return Object.entries(nativeModels).reduce(
      (prevValue, [fieldName, model]: [string, NativeModel]) => {
        this.generateErrors(prevValue, fieldName as Field, model);

        this.generateDefaultError(prevValue, fieldName as Field);

        return prevValue;
      },
      {} as ErrorCollection
    );
  }

  generateErrors(
    errors: ErrorCollection,
    fieldName: Field,
    model: NativeModel
  ) {
    let modelPropertyName: NativeModelKey;
    for (modelPropertyName in model) {
      if (this.shouldIgnoreModelProperty(modelPropertyName)) continue;

      this.generateError(errors, fieldName, modelPropertyName);
    }
  }

  generateError(
    errors: ErrorCollection,
    fieldName: Field,
    modelPropertyName: NativeModelKey
  ) {
    const REASON = utilities.makeErrorReason(fieldName, modelPropertyName);
    errors[REASON] = errorBuilder().reason(REASON).build();
  }

  generateDefaultError(errors: ErrorCollection, fieldName: Field) {
    const FIELD_NAME = utilities.upperSnake(fieldName);
    const REASON = `${FIELD_NAME}_INVALID` as ErrorReason;
    errors[REASON] = errorBuilder().reason(REASON).build();
  }

  shouldIgnoreModelProperty(modelPropertyName: NativeModelKey) {
    const ignoreKeys: NativeModelKey[] = ["defaultValue", "items", "trim"];
    return ignoreKeys.includes(modelPropertyName);
  }
}

const modelErrorBuilder = () => new ModelErrorBuilder();

export { modelErrorBuilder, ModelErrorBuilder };
