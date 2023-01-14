const { expect } = require("chai");
const { customTypeof } = require("custom-typeof");

const { requesters } = require("$/utilities");

const { FIELD_TYPE } = require("@/variables/others/fieldType");

describe("getAllStuff success tests", () => {
  it("should get all requirements for clients", async () => {
    const requester = requesters.getAllStuff();

    const { body } = await requester.sendFullFeaturedRequest({
      language: "en",
    });

    testRoutes(body.routes);
    testModels(body.models);
    testErrors(body.errors);
    testValidationModels(body.validationModels);
  });
});

const testRoutes = (routes) => {
  Object.values(routes).forEach((route) => {
    expect(route.fullUrl).to.be.an(FIELD_TYPE.STRING);
    expect(route.method).to.be.an(FIELD_TYPE.STRING);
    expect(route.statusCode).to.be.an(FIELD_TYPE.NUMBER);
    expect(route.url).to.be.an(FIELD_TYPE.STRING);
    expect(route.inputFields).to.be.an(FIELD_TYPE.OBJECT);
    expect(route.outputFields).to.be.an(FIELD_TYPE.ARRAY);
    expect(route.outputFields[0]).to.be.an(FIELD_TYPE.OBJECT);
  });
};

const testModels = (models) => {
  Object.values(models).forEach((value) => {
    expect(value).to.be.an(FIELD_TYPE.OBJECT);
    Object.values(value).forEach((prop) => {
      expect(prop.value).not.be.undefined;
      expect(prop.value).not.be.null;
      if (prop.error) {
        expect(prop.error).to.be.an(FIELD_TYPE.OBJECT);
        expect(prop.error.errorKey).to.be.an(FIELD_TYPE.STRING);
        expect(prop.error.reason).to.be.an(FIELD_TYPE.STRING);
        expect(prop.error.statusCode).to.be.an(FIELD_TYPE.NUMBER);
      }
    });
  });
};

const testErrors = (errors) => {
  Object.values(errors).forEach((error) => {
    expect(error).to.be.an(FIELD_TYPE.OBJECT);
    expect(error.errorKey).to.be.an(FIELD_TYPE.STRING);
    expect(error.reason).to.be.an(FIELD_TYPE.STRING);
    expect(error.statusCode).to.be.an(FIELD_TYPE.NUMBER);
  });
};

const testValidationModels = (validationModels) => {
  const isNotUndefined = customTypeof.isNotUndefined.bind(customTypeof);
  // eslint-disable-next-line sonarjs/cognitive-complexity
  Object.values(validationModels).forEach((prop) => {
    Object.values(prop).forEach((p) => {
      expect(p.required).to.be.an(FIELD_TYPE.BOOLEAN);
      expect(p.type).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(p.empty)) expect(p.empty).to.be.an(FIELD_TYPE.BOOLEAN);
      if (isNotUndefined(p.max)) expect(p.max).to.be.an(FIELD_TYPE.NUMBER);
      if (isNotUndefined(p.min)) expect(p.min).to.be.an(FIELD_TYPE.NUMBER);
      if (isNotUndefined(p.numeric))
        expect(p.numeric).to.be.an(FIELD_TYPE.BOOLEAN);
      if (isNotUndefined(p.trim)) expect(p.trim).to.be.an(FIELD_TYPE.BOOLEAN);

      expect(p.messages).to.be.an(FIELD_TYPE.OBJECT);
      expect(p.messages.required).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(p.messages.string))
        expect(p.messages.string).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(p.messages.stringEmpty))
        expect(p.messages.stringEmpty).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(p.messages.stringMax))
        expect(p.messages.stringMax).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(p.messages.stringMin))
        expect(p.messages.stringMin).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(p.messages.stringNumeric))
        expect(p.messages.stringNumeric).to.be.an(FIELD_TYPE.STRING);
    });
  });
};
