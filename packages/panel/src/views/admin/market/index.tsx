import Banner from "./components/Banner";

import CategoriesCard from "./components/CategoriesCard";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Tabs } from "flowbite-react";
import { SwitchInput } from "components/fields";
import { Product } from "@gold/api";
import { SortingState, ColumnFiltersState } from "@tanstack/react-table";
import React from "react";
import useProductQuery from "./useQuery";
import ProductCard from "components/card/ProductCard";

const MarketView = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filters, setFilters] = React.useState<ColumnFiltersState>([]);

  const query = useProductQuery(sorting, filters);

  const flatData = React.useMemo<Array<Product | undefined>>(
    () => (query.data?.pages ?? []).flatMap((page) => page.data),
    [query.data],
  );
  return (
    <div className="mt-3 grid h-full grid-cols-1 gap-5 xl:grid-cols-2 2xl:grid-cols-3">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        {/* NFt Banner */}
        <Banner />

        {/* NFt Header */}
        <div className="mb-4 mt-5 flex flex-col justify-between px-4 md:flex-row md:items-center">
          <h4 className="ms-1 text-2xl font-bold text-navy-700 dark:text-white">
            گالری فروش
          </h4>

          <Tabs
            aria-label="Default tabs"
            variant="underline"
            className="mb-0 ms-3 flex-1 border-b-0 pb-0"
            onActiveTabChange={(tab) => setActiveTab(tab)}
            theme={{ tabpanel: "", base: "" }}
          >
            <Tabs.Item title="همه" active />
            <Tabs.Item title="دسته ۱" />
          </Tabs>
          <SwitchInput
            className="flex flex-row"
            checked={false}
            onChange={() => {}}
            label="مشاهده جدول"
          />
        </div>

        {/* NFTs trending card */}
        <div className="z-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4">
          {flatData.map((product) => (
            <ProductCard key={product.uid} product={product} />
          ))}
        </div>
      </div>

      {/* right side section */}

      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <CategoriesCard />
      </div>
    </div>
  );
};

export default MarketView;
