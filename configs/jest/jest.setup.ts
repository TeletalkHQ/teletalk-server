import { jest } from '@jest/globals';

import { testServerInitializer } from '../utils';

jest.retryTimes(10, {
	logErrorsBeforeRetry: false,
});

await testServerInitializer();
