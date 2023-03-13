import { ProjectionType, QueryOptions } from "mongoose";

import { models } from "@/models";

import { PrivateChatMongo } from "@/types";

const findPrivateChat = async (
  data: Partial<PrivateChatMongo>,
  projection?: ProjectionType<PrivateChatMongo>,
  options?: QueryOptions
) => {
  return await models.database.mongoDb.PrivateChat.find(
    data,
    projection,
    options
  );
};

export { findPrivateChat };
