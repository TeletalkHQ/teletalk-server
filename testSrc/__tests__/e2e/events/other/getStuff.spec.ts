import chai from "chai";
import { customTypeof } from "custom-typeof";

import { events } from "~/socket/events";
import { ErrorCollection, ValidationModel } from "~/types";
import { NativeModelCollection } from "~/types/model";

import { clientInitializer } from "@/classes/ClientInitializer";
import { utils } from "@/utils";
import { FIELD_TYPE } from "@/variables";

describe(
  utils.createTestMessage.e2eSuccessDescribe("getStuff", "event"),
  () => {
    it(
      utils.createTestMessage.e2eSuccessTest(
        "getStuff",
        "event",
        "should get all requirements for clients"
      ),
      async () => {
        const clientSocket = (await clientInitializer().init()).getClient();
        clientSocket.connect();

        const requester = utils.requesterCollection.getStuff(clientSocket);

        const { data } = await requester.emitFull();

        testEvents(data.events);
        testModels(data.models);
        testErrors(data.errors);
        testValidationModels(Object.values(data.validationModels));
      }
    );
  }
);

const testEvents = (e: typeof events) => {
  Object.values(e).forEach((event) => {
    chai.expect(event.name).to.be.an(FIELD_TYPE.STRING);
    chai.expect(event.method).to.be.an(FIELD_TYPE.STRING);
    chai.expect(event.name).to.be.an(FIELD_TYPE.STRING);
    chai.expect(event.inputFields).to.be.an(FIELD_TYPE.OBJECT);
    chai.expect(event.outputFields).to.be.an(FIELD_TYPE.OBJECT);
  });
};

const testModels = (models: NativeModelCollection) => {
  Object.values(models).forEach((value) => {
    chai.expect(value).to.be.an(FIELD_TYPE.OBJECT);
    Object.values(value).forEach((prop) => {
      chai.expect(prop).not.to.be.equal(undefined);
      chai.expect(prop).not.to.be.equal(null);
    });
  });
};

const testErrors = (errors: ErrorCollection) => {
  Object.values(errors).forEach((error) => {
    chai.expect(error).to.be.an(FIELD_TYPE.OBJECT);
    chai.expect(error.reason).to.be.an(FIELD_TYPE.STRING);
    chai.expect(error.side).to.be.an(FIELD_TYPE.STRING);
    //FIXME: Should be equal to "server" or "session"
    // chai.expect(error.side).to.be.an("side");
  });
};

const testValidationModels = (validationModels: ValidationModel[]) => {
  const isDefined = customTypeof.isNotUndefined.bind(customTypeof);

  Object.values(validationModels).forEach((model) => {
    chai.expect(model.required).to.be.an(FIELD_TYPE.BOOLEAN);
    chai.expect(model.type).to.be.an(FIELD_TYPE.STRING);
    if (isDefined(model.empty))
      chai.expect(model.empty).to.be.an(FIELD_TYPE.BOOLEAN);
    if (isDefined(model.max))
      chai.expect(model.max).to.be.an(FIELD_TYPE.NUMBER);
    if (isDefined(model.min))
      chai.expect(model.min).to.be.an(FIELD_TYPE.NUMBER);
    if (isDefined(model.numeric))
      chai.expect(model.numeric).to.be.an(FIELD_TYPE.BOOLEAN);
    if (isDefined(model.trim))
      chai.expect(model.trim).to.be.an(FIELD_TYPE.BOOLEAN);

    if (!model.messages)
      throw new Error("ValidationModel.messages is undefined");

    chai.expect(model.messages).to.be.an(FIELD_TYPE.OBJECT);
    chai.expect(model.messages.required).to.be.an(FIELD_TYPE.STRING);
    if (isDefined(model.messages.string))
      chai.expect(model.messages.string).to.be.an(FIELD_TYPE.STRING);
    if (isDefined(model.messages.stringEmpty))
      chai.expect(model.messages.stringEmpty).to.be.an(FIELD_TYPE.STRING);
    if (isDefined(model.messages.stringMax))
      chai.expect(model.messages.stringMax).to.be.an(FIELD_TYPE.STRING);
    if (isDefined(model.messages.stringMin))
      chai.expect(model.messages.stringMin).to.be.an(FIELD_TYPE.STRING);
    if (isDefined(model.messages.stringNumeric))
      chai.expect(model.messages.stringNumeric).to.be.an(FIELD_TYPE.STRING);
  });
};
