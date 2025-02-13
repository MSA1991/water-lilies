import { ApiCitiesResponse } from 'api-novaposhta/lib/api/types/address';

export const getFullCityName = (city: ApiCitiesResponse): string => {
  const { SettlementTypeDescription, Description, AreaDescription } = city;

  return `${SettlementTypeDescription.slice(0, 1)}. ${Description} - ${AreaDescription} обл.`;
};
