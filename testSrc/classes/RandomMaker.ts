import { RandomMaker as RandomMakerMain } from "utility-store";

import { authHelper } from "$/classes/AuthHelper";

import { helpers } from "$/helpers";

import { models } from "@/models";

import { UserMongo } from "@/types";

class RandomMaker extends RandomMakerMain {
  constructor() {
    super();
  }

  contact() {
    return super.contact(
      models.native.firstName.maxlength.value,
      models.native.lastName.maxlength.value
    );
  }

  fullName() {
    return super.fullName(
      models.native.firstName.maxlength.value,
      models.native.lastName.maxlength.value
    );
  }

  userId() {
    return super.id(models.native.userId.maxlength.value);
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
      bio: randomMaker.string(models.native.bio.maxlength.value),
      username: randomMaker.string(models.native.username.maxlength.value),
      userId: super.id(models.native.userId.maxlength.value),
      status: {
        isActive: true,
      },
    };
  }
}

const randomMaker = new RandomMaker();

export { randomMaker, RandomMaker };
