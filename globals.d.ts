import { request, response } from "express";

import console from "~/function/utility/myConsole";

declare global {
	var myConsole = console.myConsole;
	var logger = console.myConsole;
	var expressResponse = response;
	var expressRequest = request;
}
