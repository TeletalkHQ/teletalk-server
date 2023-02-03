const http = require("http");

const httpServer = (app) => http.createServer(app);

module.exports = {
  httpServer,
};
