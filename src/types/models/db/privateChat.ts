import { Document, HydratedDocument, Model } from "mongoose";

import { PrivateChatData } from "~/types/datatypes";

export type IPrivateChatDoc = PrivateChatData & Document;
export type IPrivateChatModel = Model<IPrivateChatDoc>;

export type HydratedPrivateChat = HydratedDocument<PrivateChatData>;
