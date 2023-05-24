import http from "http";

import { clientManager } from "@/classes/ClientIdManager";

export const crateHttpServer = (app?: http.RequestListener) => {
  return http.createServer(app || defaultApp());
};

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
