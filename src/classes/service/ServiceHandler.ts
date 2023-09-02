/* eslint-disable indent */
import { customTypeof } from "custom-typeof";
import { QueryOptions } from "mongoose";
import { objectUtils } from "utility-store";

import {
	ServiceFn,
	ServiceHandlerExcludeProps,
	ServiceHandlerOptions,
	ServiceMiddleware,
	StringMap,
} from "~/types";

type PartialOptions = Partial<ServiceHandlerOptions>;

export class ServiceHandler<Query, Return> {
	private defaultExcludeProps: ServiceHandlerExcludeProps = ["_id", "__v"];
	private queryResult: StringMap;

	private options: ServiceHandlerOptions = {
		extraExcludeProps: [],
		shouldExclude: false,
		shouldFixQueryResult: true,
	};

	constructor(
		private body: ServiceFn<Query, Return>,
		private middlewaresBeforeRun: ServiceMiddleware[],
		private middlewaresAfterRun: ServiceMiddleware[],
		options: PartialOptions
	) {
		this.setOptions(options);
	}

	getOptions() {
		return this.options;
	}
	setOptions(newOptions: PartialOptions = {}) {
		this.options = { ...this.getOptions(), ...newOptions };
		return this;
	}

	exclude(extraExcludeProps = []) {
		this.setOptions({
			extraExcludeProps,
			shouldExclude: true,
		});

		return this;
	}

	async run(data: Query, options: QueryOptions = {}) {
		for (const item of this.middlewaresBeforeRun) {
			await item(data);
		}

		const queryResult = await this.body(data, options, options);

		for (const item of this.middlewaresAfterRun) {
			await item({ ...data, ...queryResult });
		}

		this.setQueryResult(queryResult as StringMap);

		const { type } = customTypeof.check(queryResult);
		if (type.isObject || type.isArray) {
			this.handleFixQueryResult();
			this.handleExclude();
		}

		return this.getQueryResult() as Return;
	}

	private handleFixQueryResult() {
		if (this.getOptions().shouldFixQueryResult) {
			const fixedQueryResult = this.fixQueryResult(this.getQueryResult());
			this.setQueryResult(fixedQueryResult);
		}
	}
	private fixQueryResult(queryResult: StringMap) {
		if (customTypeof.isObjectNative(queryResult))
			return JSON.parse(JSON.stringify(queryResult));
		return queryResult;
	}

	private handleExclude() {
		if (this.getOptions().shouldExclude) {
			const filteredQueryResult = this.excluder();
			this.setQueryResult(filteredQueryResult);
		}
	}

	private getQueryResult() {
		return this.queryResult;
	}

	private setQueryResult(queryResult: StringMap) {
		this.queryResult = queryResult;
	}

	private excluder() {
		const { extraExcludeProps } = this.getOptions();
		const excludeProps = [...this.defaultExcludeProps, ...extraExcludeProps];

		const excluder = this.getExcluder();
		return excluder.call(this, excludeProps);
	}

	private getExcluder() {
		return customTypeof.isArray(this.getQueryResult())
			? this.excludeArrayResult
			: this.excludeObjectResult;
	}

	private excludeObjectResult(excludeProps: ServiceHandlerExcludeProps) {
		return objectUtils.excludeProps(this.getQueryResult(), excludeProps);
	}

	private excludeArrayResult(
		excludeProps: ServiceHandlerExcludeProps
	): StringMap[] {
		return this.getQueryResult().map((qr: StringMap) =>
			objectUtils.excludeProps(qr, excludeProps)
		);
	}
}

export const serviceHandler =
	<Query, Return>(
		serviceBody: ServiceFn<Query, Return>,
		middlewaresBeforeRun: ServiceMiddleware[],
		middlewaresAfterRun: ServiceMiddleware[],
		buildTimeOptions: PartialOptions = {}
	) =>
	(data: Query) =>
		new ServiceHandler(serviceBody, middlewaresBeforeRun, middlewaresAfterRun, {
			...buildTimeOptions,
		}).run(data);
