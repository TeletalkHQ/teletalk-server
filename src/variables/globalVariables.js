const { Logger } = require("~/functions/utilities/Logger");

const { response, request } = require("express");

global.logger = Logger;
global.expressRequest = request;
global.expressResponse = response;
