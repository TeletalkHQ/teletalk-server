import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

const userModels = models.native.user;

const usernameFailTest: FailTestExecutor = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.username, "username")
    .missing()
    .overload()
    .invalidType()
    .minlength()
    .maxlength();
};

export { usernameFailTest };
