import { errorThrower } from "utility-store";

import { Cellphone } from "@/types";

import { countryCodeValidator } from "@/validators/countryCode";
import { countryNameValidator } from "@/validators/countryName";
import { phoneNumberValidator } from "@/validators/phoneNumber";

import { errors } from "@/variables/errors";

const cellphoneValidator = async (cellphone: Cellphone) => {
  errorThrower(
    !cellphone.phoneNumber && !cellphone.countryCode && !cellphone.countryName,
    () => ({
      ...errors.CELLPHONE_REQUIRED,
      validatedCellphone: cellphone,
    })
  );

  await countryCodeValidator(cellphone.countryCode);
  await countryNameValidator(cellphone.countryName);
  await phoneNumberValidator(cellphone.phoneNumber);
};

export { cellphoneValidator };
