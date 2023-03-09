import http from "http";

const crateHttpServer = <T extends http.RequestListener>(app: T) =>
  http.createServer(app);

export { crateHttpServer };
