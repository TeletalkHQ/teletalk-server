import { Socket as ClientSocket } from "socket.io-client";

import { EventName, SocketRoute } from "~/types";

import { Requester } from "@/classes/Requester";

export type RequesterMaker = (socketClient: ClientSocket) => Requester;

export type RequesterMakerWrapper = (socket: ClientSocket) => Requester;

export type RequesterMakerHelper = (
  route: SocketRoute
) => RequesterMakerWrapper;

export type RequesterCollection = {
  [prop in EventName]: RequesterMakerWrapper;
};

export type E2eFailTestInitializer = (
  configuredRequester: Requester,
  data: object
) => void;

export type AssertionInitializerOptions = {
  modelCheck: boolean;
  stringEquality: boolean;
};
export interface AssertionInitializerArgs {
  equalValue?: any;
  testValue: any;
}

export type AssertionInitializer = (
  data: AssertionInitializerArgs,
  options?: AssertionInitializerOptions
) => void;

export interface RequesterOptions {
  shouldFilterRequestData: boolean;
}

export type { ClientSocket };
