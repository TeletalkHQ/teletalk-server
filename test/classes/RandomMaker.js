const {
  RandomMaker: RandomMakerMain,
} = require("utility-store/src/classes/RandomMaker");

const { authHelper } = require("$/classes/AuthHelper");

const { userModels } = require("@/models/native/user");
const { requesters } = require("$/utilities");

class RandomMaker extends RandomMakerMain {
  constructor() {
    super();
  }

  contact() {
    return super.contact(
      userModels.firstName.maxlength.value,
      userModels.lastName.maxlength.value
    );
  }

  fullName() {
    return super.fullName(
      userModels.firstName.maxlength.value,
      userModels.lastName.maxlength.value
    );
  }

  async user(cellphone = this.unusedCellphone(), fullName = this.fullName()) {
    const helper = authHelper(cellphone, fullName);
    await helper.createComplete();

    const response = await requesters
      .getCurrentUserData(helper.createResponse.body.token)
      .sendFullFeaturedRequest();

    return {
      ...helper.createResponse.body,
      user: response.body.user,
    };
  }

  async users(length) {
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
      bio: randomMaker.string(userModels.bio.maxlength.value),
      username: randomMaker.string(userModels.username.maxlength.value),
    };
  }
}

const randomMaker = new RandomMaker();

module.exports = {
  randomMaker,
  RandomMaker,
};
