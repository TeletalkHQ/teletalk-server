import chai from "chai";
import sinon, { SinonStub } from "sinon";

import { utils } from "~/utils";

const expect = chai.expect;

describe("crashServer_function", () => {
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

	it("test_string_message", () => {
		testCrashServerWithMessage("This is a string message");
	});

	it("test_number_message", () => {
		testCrashServerWithMessage(12345);
	});

	it("test_object_message", () => {
		testCrashServerWithMessage({ key: "value" });
	});

	it("test_undefined_message", () => {
		testCrashServerWithMessage(undefined);
	});

	it("test_null_message", () => {
		testCrashServerWithMessage(null);
	});

	it("test_empty_string_message", () => {
		testCrashServerWithMessage("");
	});
});
