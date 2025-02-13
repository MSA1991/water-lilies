import { ApiAddress } from 'api-novaposhta';

const API_KEY = import.meta.env.VITE_NOVAPOSHTA_API_KEY;

const api = new ApiAddress({
  apiKey: API_KEY,
});

export const getCities = async (city: string) => {
  const cities = await api.getCities({
    FindByString: city,
  });

  return cities.data;
};

export const getWarehouses = async (
  cityRef: string,
  branch: string,
  limit: number,
) => {
  const warehouses = await api.getWarehouses({
    CityRef: cityRef,
    FindByString: branch,
    Limit: limit,
  });

  return warehouses.data;
};
