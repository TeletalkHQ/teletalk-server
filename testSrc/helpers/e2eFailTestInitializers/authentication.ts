// import { randomMaker } from "utility-store";

// import { models } from "@/models";

import { E2eFailTestInitializer } from "$/types";

// import { utilities } from "$/utilities";

// import { errors } from "@/variables/errors";

// const userModels = models.native.user;

const authenticationE2eFailTestInitializer: E2eFailTestInitializer = (
  configuredRequester,
  data = {}
) => {
  // const mergeOptions = (token: any) => ({ token });
  // //TODO: Add tests for jwt parts
  // it(
  //   utilities.createFailTestMessage(
  //     errors.TOKEN_REQUIRED,
  //     configuredRequester.getRoute()
  //   ),
  //   async () => {
  //     await configuredRequester.sendFullFeaturedRequest(
  //       data,
  //       errors.TOKEN_REQUIRED,
  //       mergeOptions()
  //     );
  //   }
  // );
  // it(
  //   utilities.createFailTestMessage(
  //     errors.TOKEN_INVALID_TYPE,
  //     configuredRequester.getRoute()
  //   ),
  //   async () => {
  //     await configuredRequester.sendFullFeaturedRequest(
  //       data,
  //       errors.TOKEN_INVALID_TYPE,
  //       mergeOptions(123456789)
  //     );
  //   }
  // );
  // it(
  //   utilities.createFailTestMessage(
  //     errors.TOKEN_MAXLENGTH_REACH,
  //     configuredRequester.getRoute()
  //   ),
  //   async () => {
  //     const tokenMaxlength = userModels.token.maxlength.value;
  //     await configuredRequester.sendFullFeaturedRequest(
  //       data,
  //       errors.TOKEN_MAXLENGTH_REACH,
  //       mergeOptions(randomMaker.string(tokenMaxlength + 1))
  //     );
  //   }
  // );
  // it(
  //   utilities.createFailTestMessage(
  //     errors.TOKEN_MINLENGTH_REACH,
  //     configuredRequester.getRoute()
  //   ),
  //   async () => {
  //     const tokenMinlength = userModels.token.minlength.value;
  //     await configuredRequester.sendFullFeaturedRequest(
  //       data,
  //       errors.TOKEN_MINLENGTH_REACH,
  //       mergeOptions(randomMaker.string(+tokenMinlength - 1))
  //     );
  //   }
  // );
};

export { authenticationE2eFailTestInitializer };
