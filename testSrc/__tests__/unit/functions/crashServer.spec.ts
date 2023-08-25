import { utils } from "~/utils";

import { utils as testUtils } from "@/utils";

await testUtils.asyncJestDescribe("crashServer_function", async () => {
	const { jest } = await import("@jest/globals");

	return () => {
		const crashServerThrowMessage = "process.exit() was called";

		it("test_string_message", () => {
			const spy = jest.spyOn(logger, "error");
			const spyExit = jest.spyOn(process, "exit").mockImplementationOnce(() => {
				throw new Error("process.exit() was called");
			});
			const message = "This is a string message";
			expect(() => utils.crashServer(message)).toThrowError(
				crashServerThrowMessage
			);
			expect(spy).toHaveBeenCalledWith(message);
			expect(spyExit).toHaveBeenCalledWith(1);
			spy.mockRestore();
			spyExit.mockRestore();
		});

		it("test_number_message", () => {
			const spy = jest.spyOn(logger, "error");
			const spyExit = jest.spyOn(process, "exit").mockImplementationOnce(() => {
				throw new Error(crashServerThrowMessage);
			});
			const message = 12345;
			expect(() => utils.crashServer(message)).toThrowError(
				crashServerThrowMessage
			);
			expect(spy).toHaveBeenCalledWith(message);
			expect(spyExit).toHaveBeenCalledWith(1);
			spy.mockRestore();
			spyExit.mockRestore();
		});

		it("test_object_message", () => {
			const spy = jest.spyOn(logger, "error");
			const spyExit = jest.spyOn(process, "exit").mockImplementationOnce(() => {
				throw new Error(crashServerThrowMessage);
			});
			const message = { key: "value" };
			expect(() => utils.crashServer(message)).toThrowError(
				crashServerThrowMessage
			);
			expect(spy).toHaveBeenCalledWith(message);
			expect(spyExit).toHaveBeenCalledWith(1);
			spy.mockRestore();
			spyExit.mockRestore();
		});

		it("test_undefined_message", () => {
			const spy = jest.spyOn(logger, "error");
			const spyExit = jest.spyOn(process, "exit").mockImplementationOnce(() => {
				throw new Error(crashServerThrowMessage);
			});
			const message = undefined;
			expect(() => utils.crashServer(message)).toThrowError(
				crashServerThrowMessage
			);
			expect(spy).toHaveBeenCalledWith(message);
			expect(spyExit).toHaveBeenCalledWith(1);
			spy.mockRestore();
			spyExit.mockRestore();
		});

		it("test_null_message", () => {
			const spy = jest.spyOn(logger, "error");
			const spyExit = jest.spyOn(process, "exit").mockImplementationOnce(() => {
				throw new Error(crashServerThrowMessage);
			});
			const message = null;
			expect(() => utils.crashServer(message)).toThrowError(
				crashServerThrowMessage
			);
			expect(spy).toHaveBeenCalledWith(message);
			expect(spyExit).toHaveBeenCalledWith(1);
			spy.mockRestore();
			spyExit.mockRestore();
		});

		it("test_empty_string_message", () => {
			const spy = jest.spyOn(logger, "error");
			const spyExit = jest.spyOn(process, "exit").mockImplementationOnce(() => {
				throw new Error(crashServerThrowMessage);
			});
			const message = "";
			expect(() => utils.crashServer(message)).toThrowError(
				crashServerThrowMessage
			);
			expect(spy).toHaveBeenCalledWith(message);
			expect(spyExit).toHaveBeenCalledWith(1);
			spy.mockRestore();
			spyExit.mockRestore();
		});
	};
});
