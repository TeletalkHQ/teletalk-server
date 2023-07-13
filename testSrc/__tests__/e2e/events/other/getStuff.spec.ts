import { customTypeof } from "custom-typeof";

import { ErrorCollection, ValidationModel } from "~/types";
import { NativeModelCollection } from "~/types/models";
import { events } from "~/websocket/events";

import { clientInitializer } from "@/classes/ClientInitializer";
import { utils } from "@/utils";
import { FIELD_TYPE } from "@/variables";

describe("getAllStuff success tests", () => {
  it("should get all requirements for clients", async () => {
    const clientSocket = (
      await clientInitializer().createComplete()
    ).getClient();
    const requester = utils.requesterCollection.getStuff(clientSocket);

    const { data } = await requester.sendFullFeaturedRequest();

    testEvents(data.events);
    testModels(data.models);
    testErrors(data.errors);
    testValidationModels(Object.values(data.validationModels));
  });
});

const testEvents = (e: typeof events) => {
  Object.values(e).forEach((event) => {
    expect(typeof event.name).toBe(FIELD_TYPE.STRING);
    expect(typeof event.method).toBe(FIELD_TYPE.STRING);
    expect(typeof event.name).toBe(FIELD_TYPE.STRING);
    expect(customTypeof.isObject(event.inputFields)).toBeTruthy();
    expect(customTypeof.isObject(event.outputFields)).toBeTruthy();
  });
};

const testModels = (models: NativeModelCollection) => {
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
