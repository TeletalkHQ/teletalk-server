/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWTPayload, JWTVerifyResult } from "jose";
import { Cellphone } from "teletalk-type-store";

export interface StringMap {
	[prop: string | symbol]: any;
}

export type LogLevel = "debug" | "error" | "info" | "warn";

export interface StoredClient extends Cellphone {
	isVerified: boolean;
	verificationCode: string;
	userId: string;
}

export interface AuthClientPayload extends JWTPayload {
	clientId: string;
}

export interface AuthClient extends JWTVerifyResult {
	payload: AuthClientPayload;
}

export type VoidNoArgsFn = () => void;
export type PromiseVoidNoArgsFn = () => Promise<void>;

export * from "./api";
export * from "./env";
export * from "./error";
export * from "./service";
export * from "./validation";
export * from "./model";
