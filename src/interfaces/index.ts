interface IoField {
  type: string;
  value: undefined | IoField | IoField[];
  required: boolean;
}

interface Route {
  inputFields: IoField | Record<string, never>;
  outputFields: IoField | Record<string, never>;
  statusCode: number;
}

type SocketMethods = "on" | "onAny" | "customOn" | "once";

interface SocketRoute extends Route {
  name: string;
  handler: () => void;
  method: SocketMethods;
}

export { IoField, Route, SocketRoute, SocketMethods };
