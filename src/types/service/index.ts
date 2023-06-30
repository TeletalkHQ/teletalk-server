import { ProjectionType, QueryOptions } from "mongoose";
import { UserData } from "utility-store/lib/types";

import { StringMap } from "..";
import { PrivateChatData, UserId } from "../datatypes";
import { IPrivateChatDoc, IUserDoc } from "../models";

export type ServiceHandlerExcludeProp = "_id" | "__v";
export type ServiceHandlerExcludeProps = ServiceHandlerExcludeProp[];

export interface ServiceHandlerOptions {
  extraExcludeProps: ServiceHandlerExcludeProps;
  shouldExclude: boolean;
  shouldFixQueryResult: boolean;
}

export type UserDataProjectionType = ProjectionType<UserData>;
export type PrivateChatDataProjectionType = ProjectionType<PrivateChatData>;

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

export type UserService<
  QueryData extends Partial<UserData> &
    Partial<{
      currentUserId: UserId;
      targetUserId: UserId;
    }>,
  ReturnData
> = ServiceFn<QueryData, IUserDoc, ReturnData>;
