import { request, response } from "express";

import { logger as loggerInstance } from "@/functions/utilities/Logger";

declare global {
  const logger = loggerInstance;
  const expressResponse = response;
  const expressRequest = request;
}
