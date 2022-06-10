const { logger } = require("@/classes/Logger");

const { response, request } = require("express");

global.logger = logger;
global.expressRequest = request;
global.expressResponse = response;
