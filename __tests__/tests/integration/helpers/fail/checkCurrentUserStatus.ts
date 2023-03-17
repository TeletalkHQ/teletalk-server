import { authManager } from "@/classes/AuthManager";
import { randomMaker } from "$/classes/RandomMaker";

import { models } from "@/models";

import { errors } from "@/variables/errors";
import { failTestBuilder } from "$/classes/FailTestBuilder";

const userModel = models.native.user;

const checkCurrentUserStatusFailTest = (configuredRequester, data = {}) => {
  const error = errors.CURRENT_USER_NOT_EXIST;

  it(
    failTestBuilder
      .create()
      .createTestMessage(
        errors.CURRENT_USER_NOT_EXIST,
        configuredRequester.getRoute()
      ),
    async () => {
      const wrongTokenId = randomMaker.string(userModel.userId.maxlength.value);
      const token = authManager.signToken({
        tokenId: wrongTokenId,
      });

      const { body } = await configuredRequester.sendFullFeaturedRequest(
        data,
        error,
        {
          token,
        }
      );

      expect(error.reason).toBe(body.errors[error.key].reason);
      expect(body.errors[error.key].wrongTokenId).toBe(wrongTokenId);
    }
  );

  it(
    failTestBuilder
      .create()
      .createTestMessage(
        errors.CURRENT_USER_NOT_EXIST,
        configuredRequester.getRoute()
      ),
    async () => {
      const { user } = await randomMaker.user();
      const token = authManager.signToken({
        tokenId: user.userId,
      });

      const { body } = await configuredRequester.sendFullFeaturedRequest(
        data,
        error,
        {
          token,
        }
      );
      expect(error.reason).toBe(body.errors[error.key].reason);
      expect(body.errors[error.key].isSessionExist).toBe(false);
    }
  );
};

export { checkCurrentUserStatusFailTest };
