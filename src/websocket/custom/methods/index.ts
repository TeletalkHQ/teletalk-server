import { customOn } from "@/websocket/custom/methods/on";
import { customEmit } from "@/websocket/custom/methods/emit";
import { customUse } from "@/websocket/custom/methods/use";

const customMethods = {
  emit: customEmit,
  on: customOn,
  use: customUse,
};

export { customMethods };
