import { Socket } from "socket.io-client";

import { Requester } from "$/classes/Requester";

import { EventName, SocketRoute } from "@/types";

export type RequesterMaker = (socketClient: Socket) => Requester;

export type RequesterMakerWrapper = (socket: Socket) => Requester;

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
