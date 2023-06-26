import { GetCountriesIO, SocketOnHandler } from "~/types";
import { countries } from "~/variables";

const getCountries: SocketOnHandler<GetCountriesIO> = async () => {
  return { data: { countries } };
};

export { getCountries };
