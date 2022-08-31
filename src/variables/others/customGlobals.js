const { response, request } = require("express");
const { LoggerNode } = require("utility-store/src/classes/LoggerNode");

const logger = new LoggerNode();
global.logger = logger;

global.expressRequest = request;
global.expressResponse = response;
