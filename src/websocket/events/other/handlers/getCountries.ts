import { GetCountriesIO } from "teletalk-type-store";

import { SocketOnHandler } from "~/types";
import { countries } from "~/variables";

export const getCountries: SocketOnHandler<GetCountriesIO> = async () => {
	return { data: { countries } };
};
