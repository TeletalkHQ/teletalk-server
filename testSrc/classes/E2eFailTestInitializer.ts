/* eslint-disable indent */
import { randomMaker } from "utility-store";

import { errorStore } from "~/classes/ErrorStore";
import { ErrorReason, IO } from "~/types";
import { Field, FieldType, NativeModel } from "~/types/model";
import { utils as mainUtils } from "~/utils";

import { Requester } from "@/classes/Requester";
import { RequesterOptions } from "@/types";
import { utils } from "@/utils";

type Model = Partial<Pick<NativeModel, "minLength" | "maxLength" | "length">>;

class E2eFailTestInitializer<
	PartialNativeModel extends Model,
	IOType extends IO,
> {
	constructor(
		private configuredRequester: Requester<IOType>,
		private data: IOType["input"],
		private model: PartialNativeModel,
		private fieldName: Field
	) {}

	getMinLength() {
		return this.model.minLength as number;
	}
	getMaxLength() {
		return this.model.maxLength as number;
	}
	getLength() {
		return this.model.length as number;
	}
	dataMerger(newValue?: any) {
		return { ...this.data, [this.fieldName]: newValue };
	}
	resolveErrorReason(modelPropName: keyof NativeModel) {
		return errorStore.find(
			mainUtils.makeModelErrorReason(this.fieldName, modelPropName)
		).reason;
	}

	custom(value: any, errorReason: ErrorReason) {
		this.initTest(this.dataMerger(value), errorReason);
		return this;
	}
	empty() {
		this.initTest(this.dataMerger(""), this.resolveErrorReason("empty"));
		return this;
	}
	missing() {
		this.initTest(this.dataMerger(), "INPUT_FIELDS_MISSING");
		return this;
	}
	overload() {
		const overloadedData = {
			...this.data,
			[randomMaker.string(10)]: randomMaker.string(10),
		};
		this.initTest(overloadedData, "INPUT_FIELDS_OVERLOAD", {
			shouldFilterRequestData: false,
		});
		return this;
	}
	invalidType(value?: FieldType) {
		const valueWithIncorrectType =
			value || randomMaker.number(this.getMaxLength());
		const mergedData = this.dataMerger(valueWithIncorrectType);
		this.initTest(mergedData, "INPUT_FIELD_INVALID_TYPE");
		return this;
	}
	numeric() {
		const randomValue = randomMaker.string(this.getMaxLength() - 1) + "!";
		const mergedData = this.dataMerger(randomValue);
		this.initTest(mergedData, this.resolveErrorReason("numeric"));
		return this;
	}
	minLength() {
		if (this.getMinLength() > 1) {
			const randomValue = randomMaker.string(this.getMinLength() - 1);
			const mergedData = this.dataMerger(randomValue);
			this.initTest(mergedData, this.resolveErrorReason("minLength"));
		}
		return this;
	}
	maxLength(value?: any) {
		const randomValue = value || randomMaker.string(this.getMaxLength() + 1);
		const mergedData = this.dataMerger(randomValue);
		this.initTest(mergedData, this.resolveErrorReason("maxLength"));
		return this;
	}
	length(value?: any) {
		const randomValue = value || randomMaker.string(this.getLength() + 1);
		const mergedData = this.dataMerger(randomValue);
		this.initTest(mergedData, this.resolveErrorReason("length"));
		return this;
	}

	initTest(
		data: any,
		errorReason: ErrorReason,
		options?: Partial<RequesterOptions>
	) {
		const title = utils.createTestMessage.e2eFailTest(
			this.configuredRequester.getEventName(),
			"event",
			errorReason
		);

		it(title, async () => {
			await this.configuredRequester.sendFullFeaturedRequest(
				data,
				errorReason,
				options
			);
		});
	}
}

export const e2eFailTestInitializer = <
	PartialNativeModel extends Model,
	IOType extends IO,
>(
	configuredRequester: Requester<IOType>,
	data: any,
	model: PartialNativeModel,
	fieldName: Field
) =>
	new E2eFailTestInitializer<PartialNativeModel, IOType>(
		configuredRequester,
		data,
		model,
		fieldName
	);
