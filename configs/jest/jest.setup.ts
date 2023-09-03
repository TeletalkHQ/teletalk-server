import { jest } from "@jest/globals";

import { testServerInitializer } from "../utils";

jest.retryTimes(0, {
	logErrorsBeforeRetry: false,
});

await testServerInitializer();
