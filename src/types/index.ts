/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoFields } from "check-fields";
import { JWTPayload, JWTVerifyResult } from "jose";
import { Cellphone } from "utility-store/lib/types";

export interface StringMap {
  [prop: string]: any;
}

export type LogLevel = "debug" | "error" | "info" | "warn";

export interface Route {
  inputFields: IoFields | Record<string, never>;
  outputFields: IoFields | Record<string, never>;
  isAuthRequired: boolean;
}

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

export type * from "./api";
export type * from "./env";
export type * from "./error";
export type * from "./service";
export type * from "./validation";
