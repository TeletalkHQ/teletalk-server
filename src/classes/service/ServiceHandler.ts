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
    private middlewaresBeforeRun: ServiceMiddleware<any, any>[],
    private middlewaresAfterRun: ServiceMiddleware<any, any>[],
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
    const mutatingData: any = { ...data };

    await this.executeMiddlewares(this.middlewaresBeforeRun, mutatingData);

    const queryResult = (await this.body(mutatingData, options, options)) || {};

    Object.keys(queryResult).forEach((key) => {
      mutatingData[key] = (queryResult as any)[key];
    });

    await this.executeMiddlewares(this.middlewaresAfterRun, mutatingData);

    this.setQueryResult(queryResult as Return);

    if (customTypeof.isObject(this.getQueryResult())) {
      this.setQueryResult(JSON.parse(JSON.stringify(this.getQueryResult())));
      this.handleExclude();
    }

    return this.getQueryResult() as Return;
  }

  private async executeMiddlewares(
    middlewares: ServiceMiddleware<any, any>[],
    mutatingData: StringMap
  ) {
    for (const item of middlewares) {
      const result = (await item(mutatingData)) || {};

      Object.keys(result).forEach((key) => {
        mutatingData[key] = result[key];
      });
    }
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
    middlewaresBeforeRun: ServiceMiddleware<any, any>[],
    middlewaresAfterRun: ServiceMiddleware<any, any>[],
    buildTimeOptions: PartialOptions = {}
  ) =>
  (data: Query) =>
    new ServiceHandler(serviceBody, middlewaresBeforeRun, middlewaresAfterRun, {
      ...buildTimeOptions,
    }).run(data);
