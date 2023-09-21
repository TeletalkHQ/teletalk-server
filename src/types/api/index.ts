import { IoFields } from "check-fields";

export interface Route {
	inputFields: IoFields | Record<string, never>;
	outputFields: IoFields | Record<string, never>;
	isAuthRequired: boolean;
}

export * from "./socket";
