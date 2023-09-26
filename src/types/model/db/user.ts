import { Document, HydratedDocument, Model } from "mongoose";
import { DBUserData } from "teletalk-type-store";

export type IUserDoc = DBUserData & Document;
export type IUserModel = Model<IUserDoc>;

export type HydratedUser = HydratedDocument<DBUserData>;
