const { LoggerNode } = require("utility-store/src/classes/LoggerNode");

const { response, request } = require("express");

const logger = new LoggerNode();
global.logger = logger;

global.expressRequest = request;
global.expressResponse = response;
