import { serviceBuilder } from "@/classes/service/ServiceBuilder";

import { models } from "@/models";

const findOnePrivateChat = serviceBuilder
  .create()
  .body(async (data) => {
    return await models.database.mongoDb.PrivateChat.findOne(data);
  })
  .build();

export { findOnePrivateChat };
