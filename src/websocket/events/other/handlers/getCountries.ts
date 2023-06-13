import { SocketOnHandler } from "~/types";

import { countries } from "~/variables";

const getCountries: SocketOnHandler = async () => {
  return { data: { countries } };
};

export { getCountries };
