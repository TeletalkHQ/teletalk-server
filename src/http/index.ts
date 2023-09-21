import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import http from "http";

import { clientManager } from "~/classes/ClientIdManager";

// deepcode ignore UseCsurfForExpress: <please specify a reason of ignoring this>, deepcode ignore DisablePoweredBy: <please specify a reason of ignoring this>
const expressApp = express();

expressApp.use(cookieParser());

expressApp.use(
	cors({
		credentials: true,
		origin: true,
	})
);

expressApp.get("/setClientId", async (req, res) => {
	if (req.cookies.client) {
		res.end("Client is already set!");
		return;
	}

	const clientStr = await clientManager.signClient();
	res.setHeader("Content-Type", "text/plain");
	res.statusCode = 200;
	res.cookie("client", clientStr, {
		httpOnly: true,
		sameSite: "none",
		secure: true,
	});

	res.end("Client has been set!");
});

const defaultApp = () => {
	return async (
		req: http.IncomingMessage,
		res: http.ServerResponse<http.IncomingMessage>
	) => {
		// deepcode ignore TooPermissiveCorsHeader: <please specify a reason of ignoring this>
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader("Access-Control-Request-Method", "*");
		res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
		res.setHeader("Access-Control-Allow-Headers", "*");

		if (req.url === "/setClientId") {
			const clientStr = await clientManager.signClient();
			res.setHeader("Content-Type", "text/plain");
			res.setHeader(
				"Set-Cookie",
				`client=${clientStr}; HttpOnly=true; secure=true; SameSite=None`
			);
			res.statusCode = 200;

			res.end("Client has been set!");
		} else {
			res.writeHead(404);
			res.end();
		}
	};
};

export const crateHttpServer = (app?: http.RequestListener) => {
	// deepcode ignore HttpToHttps: <please specify a reason of ignoring this>
	return http.createServer(app || expressApp || defaultApp());
};
