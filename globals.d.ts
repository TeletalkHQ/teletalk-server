import { request, response } from "express";

import console from "~/functions/utilities/myConsole";

declare global {
  var myConsole = console.myConsole;
  var logger = console.myConsole;
  var expressResponse = response;
  var expressRequest = request;
}
