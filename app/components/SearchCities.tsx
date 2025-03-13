import { ApiCitiesResponse } from 'api-novaposhta/lib/api/types/address';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDebounce } from '~/hooks/useDebounce';
import { getCities } from '~/services/novaposhta';
import { getFullCityName } from '~/helpers/getFullCityName';

type Props = {
  onChangeSearchedCity: (cityRef: string) => void;
  error?: string;
};

const MAX_VISIBLE_CITIES = 10;

export const SearchCities = ({ onChangeSearchedCity, error }: Props) => {
  const [searchedCity, setSearchedCity] = useState<string>('');
  const [cities, setCities] = useState<ApiCitiesResponse[]>([]);
  const [showCities, setShowCities] = useState<boolean>(false);

  const searchCities = useCallback(async (cityName: string) => {
    if (cityName) {
      const cities = await getCities(cityName);

      setCities(cities.slice(0, MAX_VISIBLE_CITIES));
    }
  }, []);

  const debouncedSearchCities = useDebounce(searchCities, 300);

  const handleChangeCity = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchedCity(value);

    if (value.trim()) {
      setShowCities(true);
      debouncedSearchCities(value);
    } else {
      setShowCities(false);
    }
  };

  const handleSetFullCityName = (city: ApiCitiesResponse) => {
    onChangeSearchedCity(city.Ref);
    setSearchedCity(getFullCityName(city));
    setShowCities(false);
  };

  return (
    <div className="relative">
      <label>
        Місто доставки:{' '}
        {error && <span className="text-primary">{`(${error})`}</span>}
        <input
          type="text"
          name="city"
          value={searchedCity}
          onChange={handleChangeCity}
          className="input"
        />
      </label>

      {showCities && (
        <div className="border-box absolute left-0 top-[62px] z-10 max-h-40 w-full overflow-y-auto rounded-md bg-white sm:top-[78px]">
          {!cities.length ? (
            <div className="p-2 sm:px-4">Нічого не знайдено</div>
          ) : (
            <ul>
              {cities.map((city) => (
                <li key={city.CityID}>
                  <button
                    type="button"
                    className="w-full p-2 text-start transition-colors hover:bg-secondary hover:text-white sm:px-4"
                    onClick={() => handleSetFullCityName(city)}
                  >
                    <div className="line-clamp-1">{getFullCityName(city)}</div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
