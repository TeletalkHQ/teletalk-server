import { request, response } from "express";

import { logger as loggerInstance } from "@/functions/utilities/Logger";

declare global {
  var logger = loggerInstance;
  var expressResponse = response;
  var expressRequest = request;
}
