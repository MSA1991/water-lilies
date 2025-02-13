import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { ApiWarehouseResponse } from 'api-novaposhta/lib/api/types/address';
import { WarehouseList } from './WarehouseList';
import { getWarehouses } from '~/services/novaposhta';
import { useDebounce } from '~/hooks/useDebounce';

type Props = {
  searchedCity: string;
  error?: string;
};

const MAX_VISIBLE_WAREHOUSES = 10;

export const SearchWarehouses = ({ searchedCity, error }: Props) => {
  const [searchedWarehouse, setSearchedWarehouse] = useState<string>('');
  const [warehouses, setWarehouses] = useState<ApiWarehouseResponse[]>([]);
  const [showWarehouses, setShowWarehouses] = useState<boolean>(false);
  const limitWarehouses = useRef<number>(MAX_VISIBLE_WAREHOUSES);

  const searchWarehouses = useCallback(
    async (warehouse: string, limit: number = MAX_VISIBLE_WAREHOUSES) => {
      if (searchedCity && warehouse) {
        const warehouses = await getWarehouses(searchedCity, warehouse, limit);

        setWarehouses(warehouses);
      }
    },
    [searchedCity],
  );

  const debouncedSearchWarehouses = useDebounce(searchWarehouses, 300);

  const handleChangeWarehouse = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchedWarehouse(value);
    limitWarehouses.current = MAX_VISIBLE_WAREHOUSES;

    if (value.trim()) {
      setShowWarehouses(true);
      debouncedSearchWarehouses(value);
    } else {
      setShowWarehouses(false);
    }
  };

  const setFullWarehouseAddress = (address: string) => {
    setSearchedWarehouse(address);
    setShowWarehouses(false);
  };

  const showMoreWarehouses = () => {
    limitWarehouses.current += MAX_VISIBLE_WAREHOUSES;
    searchWarehouses(searchedWarehouse, limitWarehouses.current);
  };

  return (
    <div className="relative">
      <label>
        Відділення:{' '}
        {error && <span className="text-primary">{`(${error})`}</span>}
        <input
          type="text"
          name="warehouse"
          value={searchedWarehouse}
          onChange={handleChangeWarehouse}
          className="input"
        />
      </label>

      {showWarehouses && (
        <div className="border-box absolute left-0 top-[78px] max-h-40 w-full overflow-y-auto rounded-md bg-white">
          {!searchedCity ? (
            <div className="p-2 px-4">Виберіть місто</div>
          ) : (
            <div>
              <WarehouseList
                warehouses={warehouses}
                setWarehouse={setFullWarehouseAddress}
                showMoreWarehouses={showMoreWarehouses}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
