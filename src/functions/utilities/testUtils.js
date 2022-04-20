const request = require("supertest")(require("~/app").app);

// const expect = require("chai").expect;

const myRequest = async (
  { properties: baseUrl },
  { properties: routeObject },
  data,
  { properties: errorObject } = {}
) => {
  // const errorCode = errorObject?.errorCode;
  // const errorReason = errorObject?.reason;
  // const statusCode = errorObject?.statusCode || routeObject?.statusCode;

  const response = await testRequest(
    {
      ...routeObject,
      url: `${baseUrl.url}${routeObject.url}`,
    },
    data,
    errorObject
  );

  // expect(response?.statusCode).to.be(statusCode);
  // if (errorCode) expect(response?.errorCode).to.be(errorCode);
  // if (errorReason) expect(response?.errorReason).to.be(errorReason);

  return response;
};

const testRequest = (requestObject, data) => {
  const { method, url } = requestObject;

  const response = request[method](url)
    .send(data)
    .set("Content-Type", "application/json");

  return response;
};

module.exports = { request: myRequest, testRequest };
