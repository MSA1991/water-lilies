import { ApiWarehouseResponse } from 'api-novaposhta/lib/api/types/address';

type Props = {
  warehouses: ApiWarehouseResponse[];
  setWarehouse: (address: string) => void;
  showMoreWarehouses: () => void;
};

export const WarehouseList = ({
  warehouses,
  setWarehouse,
  showMoreWarehouses,
}: Props) =>
  !warehouses.length ? (
    <div className="p-2 px-4">Нічого не знайдено</div>
  ) : (
    <div>
      <ul>
        {warehouses.map((warehouse) => (
          <li key={warehouse.Ref}>
            <button
              type="button"
              className="line-clamp-1 w-full p-2 px-4 text-start transition-colors hover:bg-secondary hover:text-white"
              onClick={() => setWarehouse(warehouse.Description)}
            >
              {warehouse.Description}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={showMoreWarehouses}
        className="w-full border-t-2 border-secondary bg-secondary-light p-2 text-center transition-colors hover:bg-secondary hover:text-white"
      >
        Завантажити більше
      </button>
    </div>
  );
