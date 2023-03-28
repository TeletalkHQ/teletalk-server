import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

import { FailTestExecutor } from "$/types";

const userModels = models.native.user;

const bioFailTest: FailTestExecutor = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.bio, "bio")
    .missing()
    .overload()
    .invalidType()
    .maxlength();
};

export { bioFailTest };
