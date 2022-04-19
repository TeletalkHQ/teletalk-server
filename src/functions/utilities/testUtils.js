const { app } = require("~/app");
const request = require("supertest")(app);

const myRequest = (
  { properties: baseUrl },
  { properties: routeObject },
  data,
  { properties: errorObject } = {}
) => {
  return testRequest(
    {
      ...routeObject,
      url: `${baseUrl.url}${routeObject.url}`,
    },
    data
  );
};

const testRequest = (requestObject, data) => {
  const { method, url, statusCode } = requestObject;

  const response = request[method](url).send(data).expect(statusCode);

  return response;
};

module.exports = { request: myRequest, testRequest };
