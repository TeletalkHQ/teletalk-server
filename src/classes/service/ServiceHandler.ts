/* eslint-disable indent */
import { customTypeof } from "custom-typeof";
import { QueryOptions } from "mongoose";
import { objectUtils } from "utility-store";

import {
  ServiceFn,
  ServiceHandlerExcludeProps,
  ServiceHandlerOptions,
  StringMap,
  UserDataProjectionType,
} from "~/types";

type PartialOptions = Partial<ServiceHandlerOptions>;

export class ServiceHandler<
  QueryData,
  ProjectionType,
  ReturnType extends StringMap
> {
  private defaultExcludeProps: ServiceHandlerExcludeProps = ["_id", "__v"];
  private queryResult: StringMap;

  private options: ServiceHandlerOptions = {
    extraExcludeProps: [],
    shouldExclude: false,
    shouldFixQueryResult: true,
  };

  constructor(
    private serviceBody: ServiceFn<QueryData, ProjectionType, ReturnType>,
    buildTimeOptions: PartialOptions = {},
    runtimeOptions: PartialOptions = {}
  ) {
    this.setOptions({ ...buildTimeOptions, ...runtimeOptions });
  }

  getOptions() {
    return this.options;
  }
  setOptions(newOptions: PartialOptions = {}) {
    this.options = { ...this.getOptions(), ...newOptions };
  }

  exclude(extraExcludeProps = []) {
    this.setOptions({
      extraExcludeProps,
      shouldExclude: true,
    });

    return this;
  }

  async run(
    data: QueryData,
    projection: UserDataProjectionType,
    options: QueryOptions
  ) {
    const queryResult = await this.serviceBody(data, projection, options);
    this.setQueryResult(queryResult);

    const { type } = customTypeof.check(queryResult);
    if (type.isObject || type.isArray) {
      this.handleFixQueryResult();
      this.handleExclude();
    }

    return this.getQueryResult();
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

  private getQueryResult() {
    return this.queryResult;
  }
  private setQueryResult(queryResult: StringMap) {
    this.queryResult = queryResult;
  }

  private handleExclude() {
    if (this.getOptions().shouldExclude) {
      const filteredQueryResult = this.excluder();
      this.setQueryResult(filteredQueryResult);
    }
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
  <QueryData, ProjectionType, ReturnType extends StringMap>(
    serviceBody: ServiceFn<QueryData, ProjectionType, ReturnType>
  ) =>
  (runtimeOptions?: PartialOptions) =>
    new ServiceHandler(serviceBody, runtimeOptions);
