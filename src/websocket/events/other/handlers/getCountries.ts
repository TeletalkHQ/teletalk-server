import { SocketOnHandler } from "@/types";

import { countries } from "@/variables/others/countries";

const getCountries: SocketOnHandler = async () => {
  return { data: { countries } };
};

export { getCountries };
