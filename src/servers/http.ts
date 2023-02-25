import http from "http";

const crateHttpServer = (app) => http.createServer(app);

export { crateHttpServer };
