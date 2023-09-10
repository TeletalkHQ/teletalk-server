import { ProjectionType, QueryOptions } from "mongoose";
import { UserData } from "utility-store/lib/types";

import { StringMap } from "..";
import { PrivateChatItem, UserId } from "../datatypes";
import { IPrivateChatDoc, IUserDoc } from "../model";

export type ServiceHandlerExcludeProp = "_id" | "__v";
export type ServiceHandlerExcludeProps = ServiceHandlerExcludeProp[];

export type ServiceMiddleware<Arg extends object, Return> = (
	arg: Arg & object
) => Return | Promise<Return>;

export interface ServiceHandlerOptions {
	extraExcludeProps: ServiceHandlerExcludeProps;
	shouldExclude: boolean;
}

export type UserDataProjectionType = ProjectionType<UserData>;
export type PrivateChatDataProjectionType = ProjectionType<PrivateChatItem>;

export type ServiceFn<
	Query = StringMap,
	Return = StringMap,
	Model = IUserDoc | IPrivateChatDoc,
> = (
	queryData: Query,
	options?: QueryOptions<Model>,
	projection?: ProjectionType<Model>
) => Return | Promise<Return>;

export type PrivateChatServiceQueryData = Partial<PrivateChatItem>;

export type PrivateChatService<
	Query extends PrivateChatServiceQueryData,
	ReturnData,
> = ServiceFn<Query, ReturnData, IPrivateChatDoc>;

export type UserServiceQueryData = Partial<UserData> &
	Partial<{
		currentUserId: UserId;
		targetUserId: UserId;
		userData: UserData;
	}>;

export type UserService<
	Query extends UserServiceQueryData,
	ReturnData,
> = ServiceFn<Query, ReturnData, IUserDoc>;
