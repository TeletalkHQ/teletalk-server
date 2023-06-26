import { Document, FilterQuery, HydratedDocument, Model } from "mongoose";

import { PrivateChatData } from "~/types/datatypes";

import { ServiceFunction } from ".";

export type IPrivateChatDoc = PrivateChatData & Document;
export type IPrivateChatModel = Model<IPrivateChatDoc>;

export type HydratedPrivateChat = HydratedDocument<PrivateChatData>;

export type PrivateChatService<T, U> = ServiceFunction<
  FilterQuery<T>,
  PrivateChatData,
  U
>;
