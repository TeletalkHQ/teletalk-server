import { request, response } from "express";

import { Logger as LoggerInstance } from "@/functions/utilities/Logger";

declare global {
  var logger = LoggerInstance;
  var expressResponse = response;
  var expressRequest = request;
}
