import lodash from "lodash";

import { errorBuilder } from "~/classes/ErrorBuilder";
import { nativeModels } from "~/models/native";
import { ErrorCollection } from "~/types";
import {
	Field,
	ModelErrorReason,
	NativeModel,
	NativeModelKey,
} from "~/types/model";
import { utils } from "~/utils";

export class ModelErrorBuilder {
	private errors: ErrorCollection = [];

	build() {
		Object.entries(nativeModels).forEach(([fieldName, model]) => {
			this.generateErrors(fieldName as Field, model);
			this.generateDefaultError(fieldName as Field);
		});

		return this.errors;
	}

	generateErrors(fieldName: Field, model: Partial<NativeModel>) {
		let modelPropertyName: NativeModelKey;
		for (modelPropertyName in model) {
			if (this.shouldIgnoreModelProperty(modelPropertyName)) continue;

			this.generateError(fieldName, modelPropertyName);
		}
	}

	generateError(fieldName: Field, modelPropertyName: NativeModelKey) {
		this.errors.push(
			errorBuilder<ModelErrorReason>()
				.reason(utils.makeModelErrorReason(fieldName, modelPropertyName))
				.build()
		);
	}

	generateDefaultError(fieldName: Field) {
		this.errors.push(
			errorBuilder()
				.reason(
					`${lodash
						.snakeCase(fieldName)
						.toUpperCase()}_INVALID` as ModelErrorReason
				)
				.build()
		);
	}

	shouldIgnoreModelProperty(modelPropertyName: NativeModelKey) {
		const ignoreKeys: NativeModelKey[] = ["defaultValue", "trim"];
		return ignoreKeys.includes(modelPropertyName);
	}
}

export const modelErrorBuilder = () => new ModelErrorBuilder();
