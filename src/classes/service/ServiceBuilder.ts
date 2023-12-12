import { ServiceFn, ServiceMiddleware } from "~/types";

import { serviceHandler } from "./ServiceHandler";

export class ServiceBuilder<Query, Return, MiddlewareQueryData> {
  private body: ServiceFn<Query & MiddlewareQueryData, Return>;
  private middlewaresBeforeRun: ServiceMiddleware<any, any>[] = [];
  private middlewaresAfterRun: ServiceMiddleware<any, any>[] = [];

  setBeforeRunMiddlewares(...args: ServiceMiddleware<any, any>[]) {
    this.middlewaresBeforeRun = args;
    return this;
  }

  setAfterRunMiddlewares(...args: ServiceMiddleware<any, any>[]) {
    this.middlewaresAfterRun = args;
    return this;
  }

  setBody(callback: ServiceFn<Query & MiddlewareQueryData, Return>) {
    this.body = callback;
    return this;
  }

  build() {
    return serviceHandler(
      this.body as ServiceFn<Query, Return>,
      this.middlewaresBeforeRun,
      this.middlewaresAfterRun
    );
  }
}

export const serviceBuilder = {
  create: <Query, Return, MiddlewareQueryData = object>() =>
    new ServiceBuilder<Query, Return, MiddlewareQueryData>(),
};
