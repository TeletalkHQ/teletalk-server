import { Socket as ClientSocket } from "socket.io-client";
import { IO } from "teletalk-type-store";

import { middlewares } from "~/socket/middlewares";

import { Requester } from "@/classes/Requester";
import { mergedServices } from "@/services";

export type RequesterMaker<IOType extends IO> = (
  socketClient: ClientSocket
) => Requester<IOType>;

export type E2eFailTestInitializer<IOType extends IO = any> = (
  configuredRequester: Requester<IOType>,
  data: Readonly<object>
) => void;

export type AssertionInitializerOptions = {
  stringEquality: boolean;
};
export interface AssertionInitializerArgs<DataType, TestDataType = DataType> {
  equalValue?: DataType;
  testValue: TestDataType;
}

export type AssertionInitializer<
  EqualDataType,
  TestDataType = EqualDataType,
> = (
  data: AssertionInitializerArgs<EqualDataType, TestDataType>,
  options: Partial<AssertionInitializerOptions>
) => void;

export interface RequesterOptions {
  shouldFilterRequestData: boolean;
}

export type MiddlewareName = keyof typeof middlewares;
export type ServiceName = keyof typeof mergedServices;

export type { ClientSocket };
