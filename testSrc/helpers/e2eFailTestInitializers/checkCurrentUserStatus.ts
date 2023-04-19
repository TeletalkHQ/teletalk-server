// import chai from "chai";

// import { authManager } from "@/classes/AuthManager";
// import { randomMaker } from "$/classes/RandomMaker";

// import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

//

// import { errors } from "@/variables/errors";

// const userModel = models.native.user;

const checkCurrentUserStatusE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  // const error = errors.CURRENT_USER_NOT_EXIST;
  // it(
  //   helpers.createFailTestMessage(
  //     errors.CURRENT_USER_NOT_EXIST,
  //     configuredRequester.getRoute()
  //   ),
  //   async () => {
  //     const wrongTokenId = randomMaker.string(userModel.userId.maxlength.value);
  //     const token = authManager.signToken({
  //       sessionId: wrongTokenId,
  //     });
  //     const { body } = await configuredRequester.sendFullFeaturedRequest(
  //       data,
  //       error,
  //       {
  //         token,
  //       }
  //     );
  //     chai.expect(error.reason).to.be.equal(body.errors[error.key].reason);
  //     chai.expect(body.errors[error.key].wrongTokenId).to.be.equal(wrongTokenId);
  //   }
  // );
  // it(
  //   helpers.createFailTestMessage(
  //     errors.CURRENT_USER_NOT_EXIST,
  //     configuredRequester.getRoute()
  //   ),
  //   async () => {
  //     const { user } = await randomMaker.user();
  //     const token = authManager.signToken({
  //       sessionId: user.userId,
  //     });
  //     const { body } = await configuredRequester.sendFullFeaturedRequest(
  //       data,
  //       error
  //     );
  //     chai.expect(error.reason).to.be.equal(body.errors[error.key].reason);
  //     chai.expect(body.errors[error.key].isSessionExist).to.be.false;
  //   }
  // );
};

export { checkCurrentUserStatusE2eFailTestInitializer };
