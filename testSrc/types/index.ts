import { Socket } from "socket.io-client";

import { Requester } from "$/classes/Requester";

export type RequesterCreator = (socketClient: Socket) => Requester;

type E2eFailTestInitializer = (
  configuredRequester: Requester,
  data: object
) => void;

type AssertionInitializerOptions = {
  modelCheck: boolean;
  stringEquality: boolean;
};
interface AssertionInitializerArgs {
  equalValue?: any;
  testValue: any;
}
type AssertionInitializer = (
  data: AssertionInitializerArgs,
  options?: AssertionInitializerOptions
) => void;

interface RequesterOptions {
  shouldFilterRequestData: boolean;
}

export {
  type AssertionInitializer,
  type AssertionInitializerArgs,
  type AssertionInitializerOptions,
  type E2eFailTestInitializer,
  type RequesterOptions,
};
