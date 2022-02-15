const { myConsole } = require("~/function/utility/myConsole");

const { response, request } = require("express");

global.myConsole = myConsole;
global.logger = myConsole;
global.expressRequest = request;
global.expressResponse = response;
