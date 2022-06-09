const { logger } = require("@/functions/utilities/Logger");

const { response, request } = require("express");

global.logger = logger;
global.expressRequest = request;
global.expressResponse = response;
