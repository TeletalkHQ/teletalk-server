const http = require("http");

const crateHttpServer = (app) => http.createServer(app);

module.exports = {
  crateHttpServer,
};
