import { expect } from "chai";
import { customTypeof } from "custom-typeof";

import { clientInitializer } from "$/classes/ClientInitializer";

import {
  NativeError,
  NativeModel,
  SocketRoute,
  ValidationModel,
} from "@/types";

import { utilities } from "$/utilities";

import { FIELD_TYPE } from "$/variables/fieldType";

describe("getAllStuff success tests", () => {
  it("should get all requirements for clients", async () => {
    const clientSocket = clientInitializer.createClient();
    const requester = utilities.requesters.getStuff(clientSocket);

    const { data } = await requester.sendFullFeaturedRequest({
      language: "en",
    });

    testRoutes(data.routes);
    testModels(data.models);
    testErrors(data.appErrors);
    testValidationModels(data.validationModels);
  });
});

const testRoutes = (routes: SocketRoute[]) => {
  Object.values(routes).forEach((route) => {
    expect(route.name).to.be.an(FIELD_TYPE.STRING);
    expect(route.method).to.be.an(FIELD_TYPE.STRING);
    expect(route.name).to.be.an(FIELD_TYPE.STRING);
    expect(route.inputFields).to.be.an(FIELD_TYPE.OBJECT);
    expect(route.outputFields).to.be.an(FIELD_TYPE.OBJECT);
  });
};

const testModels = (models: { [prop: string]: NativeModel }) => {
  Object.values(models).forEach((value) => {
    expect(value).to.be.an(FIELD_TYPE.OBJECT);
    Object.values(value).forEach((prop) => {
      expect(prop.value).not.be.undefined;
      expect(prop.value).not.be.null;
      if (prop.error) {
        expect(prop.error).to.be.an(FIELD_TYPE.OBJECT);
        expect(prop.error.key).to.be.an(FIELD_TYPE.STRING);
        expect(prop.error.reason).to.be.an(FIELD_TYPE.STRING);
      }
    });
  });
};

const testErrors = (errors: NativeError[]) => {
  Object.values(errors).forEach((error) => {
    expect(error).to.be.an(FIELD_TYPE.OBJECT);
    expect(error.key).to.be.an(FIELD_TYPE.STRING);
    expect(error.reason).to.be.an(FIELD_TYPE.STRING);
    expect(error.side).to.be.an(FIELD_TYPE.STRING);
    //FIXME: Should be equal to "server" or "client"
    // expect(error.side).to.be.equal("side");
  });
};

const testValidationModels = (validationModels: ValidationModel[]) => {
  const isNotUndefined = customTypeof.isNotUndefined.bind(customTypeof);
  // eslint-disable-next-line sonarjs/cognitive-complexity
  Object.values(validationModels).forEach((prop) => {
    Object.values(prop).forEach((model) => {
      expect(model.required).to.be.an(FIELD_TYPE.BOOLEAN);
      expect(model.type).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.empty))
        expect(model.empty).to.be.an(FIELD_TYPE.BOOLEAN);
      if (isNotUndefined(model.max))
        expect(model.max).to.be.an(FIELD_TYPE.NUMBER);
      if (isNotUndefined(model.min))
        expect(model.min).to.be.an(FIELD_TYPE.NUMBER);
      if (isNotUndefined(model.numeric))
        expect(model.numeric).to.be.an(FIELD_TYPE.BOOLEAN);
      if (isNotUndefined(model.trim))
        expect(model.trim).to.be.an(FIELD_TYPE.BOOLEAN);

      if (!model.messages)
        throw new Error("ValidationModel.messages is undefined");

      expect(model.messages).to.be.an(FIELD_TYPE.OBJECT);
      expect(model.messages.required).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.messages.string))
        expect(model.messages.string).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.messages.stringEmpty))
        expect(model.messages.stringEmpty).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.messages.stringMax))
        expect(model.messages.stringMax).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.messages.stringMin))
        expect(model.messages.stringMin).to.be.an(FIELD_TYPE.STRING);
      if (isNotUndefined(model.messages.stringNumeric))
        expect(model.messages.stringNumeric).to.be.an(FIELD_TYPE.STRING);
    });
  });
};
