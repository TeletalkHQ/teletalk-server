import { ServiceFn, ServiceMiddleware, StringMap } from "~/types";

import { serviceHandler } from "./ServiceHandler";

export class ServiceBuilder<Query, Return, MiddlewareData> {
	private body: ServiceFn<Query & MiddlewareData, Return>;
	private middlewaresBeforeRun: ServiceMiddleware[] = [];
	private middlewaresAfterRun: ServiceMiddleware[] = [];

	setMiddlewares(
		beforeRun: ServiceMiddleware[],
		afterRun: ServiceMiddleware[] = []
	) {
		this.middlewaresBeforeRun = beforeRun;
		this.middlewaresAfterRun = afterRun;
		return this;
	}

	setBody(callback: ServiceFn<Query & MiddlewareData, Return>) {
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
	create: <Query, Return, MiddlewareData = StringMap>() =>
		new ServiceBuilder<Query, Return, MiddlewareData>(),
};
