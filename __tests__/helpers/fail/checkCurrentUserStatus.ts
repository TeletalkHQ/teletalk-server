// import { expect } from "chai";

// import { authManager } from "@/classes/AuthManager";
// import { randomMaker } from "$/classes/RandomMaker";

// import { models } from "@/models";

import { FailTestExecutor } from "$/types";

// import { utilities } from "$/utilities";

// import { errors } from "@/variables/errors";

// const userModel = models.native.user;

const checkCurrentUserStatusFailTest: FailTestExecutor = (
  configuredRequester,
  data = {}
) => {
  // const error = errors.CURRENT_USER_NOT_EXIST;
  // it(
  //   utilities.createFailTestMessage(
  //     errors.CURRENT_USER_NOT_EXIST,
  //     configuredRequester.getRoute()
  //   ),
  //   async () => {
  //     const wrongTokenId = randomMaker.string(userModel.userId.maxlength.value);
  //     const token = authManager.signToken({
  //       tokenId: wrongTokenId,
  //     });
  //     const { body } = await configuredRequester.sendFullFeaturedRequest(
  //       data,
  //       error,
  //       {
  //         token,
  //       }
  //     );
  //     expect(error.reason).to.be.equal(body.errors[error.key].reason);
  //     expect(body.errors[error.key].wrongTokenId).to.be.equal(wrongTokenId);
  //   }
  // );
  // it(
  //   utilities.createFailTestMessage(
  //     errors.CURRENT_USER_NOT_EXIST,
  //     configuredRequester.getRoute()
  //   ),
  //   async () => {
  //     const { user } = await randomMaker.user();
  //     const token = authManager.signToken({
  //       tokenId: user.userId,
  //     });
  //     const { body } = await configuredRequester.sendFullFeaturedRequest(
  //       data,
  //       error
  //     );
  //     expect(error.reason).to.be.equal(body.errors[error.key].reason);
  //     expect(body.errors[error.key].isSessionExist).to.be.false;
  //   }
  // );
};

export { checkCurrentUserStatusFailTest };
