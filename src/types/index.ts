import { NativeModel } from "@/interfaces";

type SocketMethods = "on" | "onAny" | "customOn" | "once";

type NodeEnvValue =
  | "build"
  | "development"
  | "production"
  | "production_local"
  | "test_development"
  | "test_production"
  | "test_production_local";

type LogLevel = "debug" | "error" | "info" | "warn";

type NativeModelKey = keyof NativeModel;

export { LogLevel, NativeModelKey, NodeEnvValue, SocketMethods };
