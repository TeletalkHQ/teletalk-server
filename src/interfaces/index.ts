import { SocketMethods } from "@/types";

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

interface SocketRoute extends Route {
  name: string;
  handler: () => void;
  method: SocketMethods;
}

export { IoField, Route, SocketRoute };
