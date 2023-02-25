import { failTestBuilder } from "$/classes/FailTestBuilder";

import { models } from "@/models";

const userModels = models.native.user;

const bioFailTest = (configuredRequester, data) => {
  failTestBuilder
    .create(configuredRequester, data, userModels.bio, "bio")
    .missing()
    .overload()
    .invalidType()
    .maxlength();
};

export { bioFailTest };
