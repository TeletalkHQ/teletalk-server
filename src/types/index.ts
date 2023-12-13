import { JWTPayload, JWTVerifyResult } from "jose";
import { Cellphone } from "teletalk-type-store";

export interface StringMap {
  [prop: string | symbol]: any;
}

export type LogLevel = "debug" | "error" | "info" | "warn";

export interface StoredAuthSession extends Cellphone {
  isVerified: boolean;
  verificationCode: string;
}

export interface SessionPayload extends JWTPayload {
  sessionId: string;
}

export interface VerifiedSession extends JWTVerifyResult {
  payload: SessionPayload;
}

export type VoidNoArgsFn = () => void;
export type PromiseVoidNoArgsFn = () => Promise<void>;

export * from "./api";
export * from "./env";
export * from "./error";
export * from "./service";
export * from "./validation";
export * from "./model";
