import { request, response } from "express";

import { myConsole } from "~/functions/utilities/myConsole";

declare global {
  var logger = myConsole;
  var expressResponse = response;
  var expressRequest = request;
}
