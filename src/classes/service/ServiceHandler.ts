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
	private queryResult: Return;

	private options: ServiceHandlerOptions = {
		extraExcludeProps: [],
		shouldExclude: true,
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

		this.setQueryResult(queryResult);

		if (customTypeof.isObject(this.getQueryResult())) {
			this.setQueryResult(JSON.parse(JSON.stringify(this.getQueryResult())));
			this.handleExclude();
		}

		return this.getQueryResult() as Return;
	}

	private getQueryResult() {
		return this.queryResult;
	}

	private setQueryResult(queryResult: Return) {
		this.queryResult = queryResult;
	}

	private handleExclude() {
		if (this.getOptions().shouldExclude) {
			const filteredQueryResult = this.excluder();
			this.setQueryResult(filteredQueryResult as Return);
		}
	}

	private excluder() {
		const { extraExcludeProps } = this.getOptions();
		const excludeProps = [...this.defaultExcludeProps, ...extraExcludeProps];

		return objectUtils.excludeProps(
			this.getQueryResult() as StringMap,
			excludeProps
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
