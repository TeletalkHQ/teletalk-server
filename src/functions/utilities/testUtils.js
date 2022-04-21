const request = require("supertest")(require("~/app").app);

const expect = require("chai").expect;

const myRequest = async (
  { properties: baseUrl },
  { properties: routeObject },
  data,
  { properties: errorObject } = {},
  errorKey
) => {
  const response = await testRequest(
    {
      ...routeObject,
      url: `${baseUrl.url}${routeObject.url}`,
    },
    data
  );

  const statusCode = errorObject?.statusCode || routeObject?.statusCode;
  expect(response.statusCode).to.equal(statusCode);
  if (response.body?.statusCode)
    expect(response.body.statusCode).to.equal(statusCode);

  if (statusCode > 299) {
    logger.log(response.body);
    const errorCode = errorObject?.errorCode;
    const errorReason = errorObject?.reason;
    expect(response.body.errors[errorKey]?.errorCode).to.equal(errorCode);

    expect(response.body.errors[errorKey]?.reason).to.equal(errorReason);
  }

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
