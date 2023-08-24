import { ProjectionType, QueryOptions } from "mongoose";
import { UserData } from "utility-store/lib/types";

import { StringMap } from "..";
import { PrivateChatItem, UserId } from "../datatypes";
import { IPrivateChatDoc, IUserDoc } from "../models";

export type ServiceHandlerExcludeProp = "_id" | "__v";
export type ServiceHandlerExcludeProps = ServiceHandlerExcludeProp[];

export interface ServiceHandlerOptions {
	extraExcludeProps: ServiceHandlerExcludeProps;
	shouldExclude: boolean;
	shouldFixQueryResult: boolean;
}

export type UserDataProjectionType = ProjectionType<UserData>;
export type PrivateChatDataProjectionType = ProjectionType<PrivateChatItem>;

export type ServiceFn<
	QueryData = StringMap,
	Model = IUserDoc | IPrivateChatDoc,
	ReturnType = object
> = (
	queryData: QueryData,
	projection?: ProjectionType<Model>,
	options?: QueryOptions<Model>
) => Promise<ReturnType>;

export type PrivateChatService<QueryData, ReturnData> = ServiceFn<
	QueryData,
	IPrivateChatDoc,
	ReturnData
>;

export type UserServiceQueryData = Partial<UserData> &
	Partial<{
		currentUserId: UserId;
		targetUserId: UserId;
	}>;

export type UserService<
	QueryData extends UserServiceQueryData,
	ReturnData
> = ServiceFn<QueryData, IUserDoc, ReturnData>;
