import { Document, HydratedDocument, Model } from "mongoose";
import { UserData } from "utility-store/lib/types";

import { ServiceFunction } from ".";

export type HydratedUser = HydratedDocument<UserData>;

export type IUserDoc = UserData & Document;

export type IUserModel = Model<IUserDoc>;

export type UserService<T> = ServiceFunction<T, UserData, IUserDoc>;
