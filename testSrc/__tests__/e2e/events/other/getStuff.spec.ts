import { customTypeof } from "custom-typeof";

import { clientInitializer } from "$/classes/ClientInitializer";

import { helpers } from "$/helpers";

import {
  ErrorCollection,
  NativeModel,
  NativeModelKey,
  SocketRoute,
  ValidationModel,
} from "@/types";

import { FIELD_TYPE } from "$/variables";

describe("getAllStuff success tests", () => {
  it("should get all requirements for clients", async () => {
    const clientSocket = (
      await clientInitializer().createComplete()
    ).getClient();
    const requester = helpers.requesterCollection.getStuff(clientSocket);

    const { data } = await requester.sendFullFeaturedRequest();

    testRoutes(Object.values(data.routes));
    testModels(data.models);
    testErrors(data.appErrors);
    testValidationModels(data.validationModels);
  });
});

const testRoutes = (routes: SocketRoute[]) => {
  routes.forEach((route) => {
    expect(typeof route.name).toBe(FIELD_TYPE.STRING);
    expect(typeof route.method).toBe(FIELD_TYPE.STRING);
    expect(typeof route.name).toBe(FIELD_TYPE.STRING);
    expect(customTypeof.isObject(route.inputFields)).toBeTruthy();
    expect(customTypeof.isObject(route.outputFields)).toBeTruthy();
  });
};

const testModels = (models: { [prop in NativeModelKey]: NativeModel }) => {
  Object.values(models).forEach((value) => {
    expect(customTypeof.isObject(value)).toBeTruthy();
    Object.values(value).forEach((prop) => {
      expect(prop).toBeDefined();
      expect(prop).not.toBeNull();
    });
  });
};

const testErrors = (errors: ErrorCollection) => {
  Object.values(errors).forEach((error) => {
    expect(customTypeof.isObject(error)).toBeTruthy();
    expect(typeof error.reason).toBe(FIELD_TYPE.STRING);
    expect(typeof error.side).toBe(FIELD_TYPE.STRING);
    //FIXME: Should be equal to "server" or "client"
    // expect(error.side).toBe("side");
  });
};

const testValidationModels = (validationModels: ValidationModel[]) => {
  const isDefined = customTypeof.isNotUndefined.bind(customTypeof);

  Object.values(validationModels).forEach((model) => {
    expect(typeof model.required).toBe(FIELD_TYPE.BOOLEAN);
    expect(typeof model.type).toBe(FIELD_TYPE.STRING);
    if (isDefined(model.empty))
      expect(typeof model.empty).toBe(FIELD_TYPE.BOOLEAN);
    if (isDefined(model.max))
      expect(customTypeof.isNumber(model.max)).toBeTruthy();
    if (isDefined(model.min))
      expect(customTypeof.isNumber(model.min)).toBeTruthy();
    if (isDefined(model.numeric))
      expect(typeof model.numeric).toBe(FIELD_TYPE.BOOLEAN);
    if (isDefined(model.trim))
      expect(typeof model.trim).toBe(FIELD_TYPE.BOOLEAN);

    if (!model.messages)
      throw new Error("ValidationModel.messages is undefined");

    expect(customTypeof.isObject(model.messages)).toBeTruthy();
    expect(typeof model.messages.required).toBe(FIELD_TYPE.STRING);
    if (isDefined(model.messages.string))
      expect(typeof model.messages.string).toBe(FIELD_TYPE.STRING);
    if (isDefined(model.messages.stringEmpty))
      expect(typeof model.messages.stringEmpty).toBe(FIELD_TYPE.STRING);
    if (isDefined(model.messages.stringMax))
      expect(typeof model.messages.stringMax).toBe(FIELD_TYPE.STRING);
    if (isDefined(model.messages.stringMin))
      expect(typeof model.messages.stringMin).toBe(FIELD_TYPE.STRING);
    if (isDefined(model.messages.stringNumeric))
      expect(typeof model.messages.stringNumeric).toBe(FIELD_TYPE.STRING);
  });
};
