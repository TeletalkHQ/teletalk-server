import { Result, validationChecker } from "utility-store";

import { ValidationModelBuilder } from "@/classes/modelBuilder/ValidationModelBuilder";

import { models } from "@/models";

import { errors } from "@/variables/errors";

const validator = ValidationModelBuilder.compiler(models.validation.user.bio);

const bioValidator = async (bio: unknown) => {
  const validationResult = await validator({
    bio,
  });

  errorChecker(validationResult, bio);
};

const errorChecker = (result: Result, bio: unknown) => {
  validationChecker(
    result,
    {
      extraErrorFields: {
        validatedBio: bio,
      },
    },
    models.native.user.bio
  ).check(function () {
    this.required()
      .string()
      .stringMax()
      .stringMin()
      .throwAnyway(errors.BIO_INVALID);
  });
};

export { bioValidator };
