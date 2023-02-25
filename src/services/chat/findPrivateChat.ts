import { serviceBuilder } from "@/classes/service/ServiceBuilder";

import { models } from "@/models";

const findPrivateChat = serviceBuilder
  .create()
  .body(async (data) => {
    return await models.database.mongoDb.PrivateChat.find(data);
  })
  .build();

export { findPrivateChat };
