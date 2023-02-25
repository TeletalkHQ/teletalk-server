import { serviceBuilder } from "@/classes/service/ServiceBuilder";

import { models } from "@/models";

const getAllUsers = serviceBuilder
  .create()
  .body(async () => {
    return await models.database.mongoDb.User.find();
  })
  .build();

export { getAllUsers };
