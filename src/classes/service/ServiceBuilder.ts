import { ServiceFn } from "~/types";

import { serviceHandler } from "./ServiceHandler";

export class ServiceBuilder {
  private serviceBody: ServiceFn;

  body(callback: ServiceFn) {
    this.serviceBody = callback;
    return this;
  }

  build() {
    return serviceHandler.create(this.serviceBody);
  }
}

export const serviceBuilder = {
  create: () => new ServiceBuilder(),
};
