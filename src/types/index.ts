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

export { LogLevel, NodeEnvValue, SocketMethods };
