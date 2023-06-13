import { errorBuilder } from "~/classes/ErrorBuilder";

import { nativeModels } from "~/models/native";

import {
  ModelErrorCollection,
  Field,
  NativeModel,
  NativeModelKey,
  ModelErrorReason,
} from "~/types";

import { utilities } from "~/utilities";

class ModelErrorBuilder {
  build() {
    return Object.entries(nativeModels).reduce(
      (prevValue, [fieldName, model]: [string, Partial<NativeModel>]) => {
        this.generateErrors(prevValue, fieldName as Field, model);

        this.generateDefaultError(prevValue, fieldName as Field);

        return prevValue;
      },
      {} as ModelErrorCollection
    );
  }

  generateErrors(
    errors: ModelErrorCollection,
    fieldName: Field,
    model: Partial<NativeModel>
  ) {
    let modelPropertyName: NativeModelKey;
    for (modelPropertyName in model) {
      if (this.shouldIgnoreModelProperty(modelPropertyName)) continue;

      this.generateError(errors, fieldName, modelPropertyName);
    }
  }

  generateError(
    errors: ModelErrorCollection,
    fieldName: Field,
    modelPropertyName: NativeModelKey
  ) {
    const reason = utilities.makeModelErrorReason(fieldName, modelPropertyName);
    errors[reason] = errorBuilder<ModelErrorReason>().reason(reason).build();
  }

  generateDefaultError(errors: ModelErrorCollection, fieldName: Field) {
    const reason = `${fieldName}_invalid` as ModelErrorReason;
    errors[reason] = errorBuilder().reason(reason).build();
  }

  shouldIgnoreModelProperty(modelPropertyName: NativeModelKey) {
    const ignoreKeys: NativeModelKey[] = ["defaultValue", "items", "trim"];
    return ignoreKeys.includes(modelPropertyName);
  }
}

const modelErrorBuilder = () => new ModelErrorBuilder();

export { modelErrorBuilder, ModelErrorBuilder };
