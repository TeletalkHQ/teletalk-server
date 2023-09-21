import { Document, HydratedDocument, Model } from "mongoose";
import { UserData } from "teletalk-type-store";

export type IUserDoc = UserData & Document;
export type IUserModel = Model<IUserDoc>;

export type HydratedUser = HydratedDocument<UserData>;
