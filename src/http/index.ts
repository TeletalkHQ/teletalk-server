import http from "http";

import cors from "cors";
import express from "express";
import { clientManager } from "@/classes/ClientIdManager";

const expressApp = express();

expressApp.use(
  cors({
    credentials: true,
    origin: true,
  })
);

expressApp.get("/setClientId", async (_req, res) => {
  const clientStr = await clientManager.signClient();
  res.setHeader("Content-Type", "text/plain");
  res.statusCode = 200;
  res.cookie("client", clientStr, {
    httpOnly: false,
    sameSite: false,
    secure: false,
  });

  res.end("Client has been set!");
});

const defaultApp = () => {
  return async (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    if (req.url === "/setClientId") {
      const clientStr = await clientManager.signClient();
      res.writeHead(200, {
        "Set-Cookie": `client=${clientStr}; HttpOnly; SameSite=Strict`,
        "Content-Type": "text/plain",
      });
      res.end("Client has been set!");
    } else {
      res.writeHead(404);
      res.end();
    }
  };
};
