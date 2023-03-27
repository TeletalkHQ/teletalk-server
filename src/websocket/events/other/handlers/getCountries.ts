import { countries } from "@/variables/others/countries";

const getCountries = async () => {
  return { data: { countries } };
};

export { getCountries };
