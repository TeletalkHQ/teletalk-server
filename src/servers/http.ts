import http from "http";

type ClientIdGenerator = () => string;

const crateHttpServer = (
  clientIdGenerator: ClientIdGenerator,
  app?: http.RequestListener
) => {
  return http.createServer(app || defaultApp(clientIdGenerator));
};

const defaultApp = (clientIdGenerator: ClientIdGenerator) => {
  return (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    if (req.url === "/setClientId") {
      const clientId = clientIdGenerator();
      res.writeHead(200, {
        "Set-Cookie": `clientId=${clientId}; HttpOnly; SameSite=Strict`,
        "Content-Type": "text/plain",
      });
      res.end("Client ID has been set!");
    } else {
      res.writeHead(404);
      res.end();
    }
  };
};

export { crateHttpServer };
