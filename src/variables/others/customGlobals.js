const { response, request } = require("express");
const { LoggerChalker } = require("logger-chalker");

global.logger = new LoggerChalker();

global.expressRequest = request;
global.expressResponse = response;
