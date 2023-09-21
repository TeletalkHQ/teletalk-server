import { Document, HydratedDocument, Model } from "mongoose";
import { PrivateChatItem } from "teletalk-type-store";

export type IPrivateChatDoc = PrivateChatItem & Document;
export type IPrivateChatModel = Model<IPrivateChatDoc>;

export type HydratedPrivateChat = HydratedDocument<PrivateChatItem>;
