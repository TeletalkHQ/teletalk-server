import { RandomMaker as RandomMakerMain } from "utility-store";

import { models } from "~/models";
import { UserMongo } from "~/types";

import { authHelper } from "@/classes/AuthHelper";
import { helpers } from "@/helpers";

class RandomMaker extends RandomMakerMain {
  constructor() {
    super();
  }

  contact() {
    return super.contact(
      models.native.firstName.maxLength,
      models.native.lastName.maxLength
    );
  }

  fullName() {
    return super.fullName(
      models.native.firstName.maxLength,
      models.native.lastName.maxLength
    );
  }

  userId() {
    return super.id(models.native.userId.maxLength);
  }

  async user(cellphone = this.unusedCellphone(), fullName = this.fullName()) {
    const helper = authHelper(cellphone, fullName);
    await helper.createComplete();

    const response = await helpers.requesterCollection
      .getUserData(helper.getClientSocket())
      .sendFullFeaturedRequest();

    return {
      ...helper.getResponses().create.data,
      user: response.data.user as UserMongo,
      socket: helper.getClientSocket(),
    };
  }

  async users(length: number) {
    const users = [];
    for (let i = 0; i < length; i++) {
      const user = await this.user();
      users.push(user);
    }
    return users;
  }

  publicUserData() {
    return {
      ...randomMaker.fullName(),
      bio: randomMaker.string(models.native.bio.maxLength),
      username: randomMaker.string(models.native.username.maxLength),
      userId: super.id(models.native.userId.maxLength),
    };
  }
}

const randomMaker = new RandomMaker();

export { randomMaker };
