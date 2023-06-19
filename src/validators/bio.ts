import {
  ValidationResult,
  validationChecker,
} from "~/classes/ValidationChecker";
import { ValidationModelBuilder } from "~/classes/modelBuilder/ValidationModelBuilder";
import { models } from "~/models";
import { Validator } from "~/types";
import { errors } from "~/variables";

const validator = ValidationModelBuilder.compiler(models.validation.bio);

const bioValidator: Validator = async (bio: unknown) => {
  const validationResult = await validator(bio);

  errorChecker(validationResult, bio);
};

const errorChecker = (result: ValidationResult, bio: unknown) => {
  validationChecker(result, "bio", {
    extraErrorFields: {
      validatedBio: bio,
    },
  }).check(function () {
    this.required()
      .string()
      .stringMax()
      .stringMin()
      .throwAnyway(errors.bio_invalid);
  });
};

export { bioValidator };
