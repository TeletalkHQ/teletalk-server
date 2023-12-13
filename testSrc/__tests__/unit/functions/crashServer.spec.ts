import chai from "chai";
import sinon, { SinonStub } from "sinon";

import { utils } from "~/utils";

import { utils as testUtils } from "@/utils";

const expect = chai.expect;

describe(
  testUtils.createTestMessage.unitFailDescribe(
    `fn${utils.crashServer.name}`,
    "function"
  ),
  () => {
    const crashServerThrowMessage = "process.exit() was called";
    let loggerErrorStub: SinonStub;
    let processExitStub: SinonStub;

    beforeEach(() => {
      loggerErrorStub = sinon.stub(logger, "error");
      processExitStub = sinon.stub(process, "exit");
      processExitStub.throws(new Error(crashServerThrowMessage));
    });

    afterEach(() => {
      loggerErrorStub.restore();
      processExitStub.restore();
    });

    function testCrashServerWithMessage(message: unknown) {
      expect(() => utils.crashServer(message)).to.throw(
        Error,
        crashServerThrowMessage
      );
      expect(loggerErrorStub.calledWith(message)).to.be.true;
      expect(processExitStub.calledWith(1)).to.be.true;
    }

    it(
      testUtils.createTestMessage.unitSuccessTest(
        `fn${utils.crashServer}`,
        "function",
        "test String Message"
      ),
      () => {
        testCrashServerWithMessage("This is a string message");
      }
    );

    it(
      testUtils.createTestMessage.unitSuccessTest(
        `fn${utils.crashServer}`,
        "function",
        "test Number Message"
      ),
      () => {
        testCrashServerWithMessage(12345);
      }
    );

    it(
      testUtils.createTestMessage.unitSuccessTest(
        `fn${utils.crashServer}`,
        "function",
        "test Object Message"
      ),
      () => {
        testCrashServerWithMessage({ key: "value" });
      }
    );

    it(
      testUtils.createTestMessage.unitSuccessTest(
        `fn${utils.crashServer}`,
        "function",
        "test Undefined Message"
      ),
      () => {
        testCrashServerWithMessage(undefined);
      }
    );

    it(
      testUtils.createTestMessage.unitSuccessTest(
        `fn${utils.crashServer}`,
        "function",
        "test Null Message"
      ),
      () => {
        testCrashServerWithMessage(null);
      }
    );

    it(
      testUtils.createTestMessage.unitSuccessTest(
        `fn${utils.crashServer}`,
        "function",
        "test Empty String Message"
      ),
      () => {
        testCrashServerWithMessage("");
      }
    );
  }
);
