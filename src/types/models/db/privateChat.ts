import { Document, HydratedDocument, Model } from "mongoose";

import { PrivateChatItem } from "~/types/datatypes";

export type IPrivateChatDoc = PrivateChatItem & Document;
export type IPrivateChatModel = Model<IPrivateChatDoc>;

export type HydratedPrivateChat = HydratedDocument<PrivateChatItem>;
