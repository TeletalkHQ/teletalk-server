import { customTypeof } from "custom-typeof";

import { requesters } from "$/utilities";

import { FIELD_TYPE } from "@/variables/others/fieldType";

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
    expect(route.fullUrl).toBeInstanceOf(FIELD_TYPE.STRING);
    expect(route.method).toBeInstanceOf(FIELD_TYPE.STRING);
    expect(route.statusCode).toBeInstanceOf(FIELD_TYPE.NUMBER);
    expect(route.url).toBeInstanceOf(FIELD_TYPE.STRING);
    expect(route.inputFields).toBeInstanceOf(FIELD_TYPE.OBJECT);
    expect(route.outputFields).toBeInstanceOf(FIELD_TYPE.ARRAY);
    expect(route.outputFields[0]).toBeInstanceOf(FIELD_TYPE.OBJECT);
  });
};

const testModels = (models) => {
  Object.values(models).forEach((value) => {
    expect(value).toBeInstanceOf(FIELD_TYPE.OBJECT);
    Object.values(value).forEach((prop) => {
      expect(prop.value).toBeDefined();
      expect(prop.value).not.toBeNull();
      if (prop.error) {
        expect(prop.error).toBeInstanceOf(FIELD_TYPE.OBJECT);
        expect(prop.error.key).toBeInstanceOf(FIELD_TYPE.STRING);
        expect(prop.error.reason).toBeInstanceOf(FIELD_TYPE.STRING);
        expect(prop.error.statusCode).toBeInstanceOf(FIELD_TYPE.NUMBER);
      }
    });
  });
};

const testErrors = (errors) => {
  Object.values(errors).forEach((error) => {
    expect(error).toBeInstanceOf(FIELD_TYPE.OBJECT);
    expect(error.key).toBeInstanceOf(FIELD_TYPE.STRING);
    expect(error.reason).toBeInstanceOf(FIELD_TYPE.STRING);
    expect(error.statusCode).toBeInstanceOf(FIELD_TYPE.NUMBER);
  });
};

const testValidationModels = (validationModels) => {
  const isNotUndefined = customTypeof.isNotUndefined.bind(customTypeof);
  // eslint-disable-next-line sonarjs/cognitive-complexity
  Object.values(validationModels).forEach((prop) => {
    Object.values(prop).forEach((p) => {
      expect(p.required).toBeInstanceOf(FIELD_TYPE.BOOLEAN);
      expect(p.type).toBeInstanceOf(FIELD_TYPE.STRING);
      if (isNotUndefined(p.empty))
        expect(p.empty).toBeInstanceOf(FIELD_TYPE.BOOLEAN);
      if (isNotUndefined(p.max))
        expect(p.max).toBeInstanceOf(FIELD_TYPE.NUMBER);
      if (isNotUndefined(p.min))
        expect(p.min).toBeInstanceOf(FIELD_TYPE.NUMBER);
      if (isNotUndefined(p.numeric))
        expect(p.numeric).toBeInstanceOf(FIELD_TYPE.BOOLEAN);
      if (isNotUndefined(p.trim))
        expect(p.trim).toBeInstanceOf(FIELD_TYPE.BOOLEAN);

      expect(p.messages).toBeInstanceOf(FIELD_TYPE.OBJECT);
      expect(p.messages.required).toBeInstanceOf(FIELD_TYPE.STRING);
      if (isNotUndefined(p.messages.string))
        expect(p.messages.string).toBeInstanceOf(FIELD_TYPE.STRING);
      if (isNotUndefined(p.messages.stringEmpty))
        expect(p.messages.stringEmpty).toBeInstanceOf(FIELD_TYPE.STRING);
      if (isNotUndefined(p.messages.stringMax))
        expect(p.messages.stringMax).toBeInstanceOf(FIELD_TYPE.STRING);
      if (isNotUndefined(p.messages.stringMin))
        expect(p.messages.stringMin).toBeInstanceOf(FIELD_TYPE.STRING);
      if (isNotUndefined(p.messages.stringNumeric))
        expect(p.messages.stringNumeric).toBeInstanceOf(FIELD_TYPE.STRING);
    });
  });
};
