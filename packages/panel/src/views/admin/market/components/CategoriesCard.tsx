import Card from "components/card";
import { Category } from "@gold/api";
import {
  SortingState,
  ColumnFiltersState,
  ColumnOrderState,
} from "@tanstack/react-table";
import React from "react";
import useCategoryQuery from "views/admin/categories/useQuery";
import Nft2 from "assets/img/nfts/Nft2.png";
import { NavLink } from "react-router-dom";

const CategoriesCard = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filters, setFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([]);

  const query = useCategoryQuery(sorting, filters);

  const flatData = React.useMemo<Array<Category | undefined>>(
    () => (query.data?.pages ?? []).flatMap((page) => page.data),
    [query.data],
  );

  return (
    <Card className="!z-5 overflow-hidden">
      {/* HistoryCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          دسته بندی ها
        </div>
        <NavLink
          to="/admin/categories"
          className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20"
        >
          مشاهده همه
        </NavLink>
      </div>

      {/* History CardData */}

      {flatData.map((data, index) => (
        <div
          key={index}
          className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center">
              <img className="h-full w-full rounded-xl" src={Nft2} alt="" />
            </div>
            <div className="flex flex-col">
              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                {data.title}
              </h5>
              <p className="mt-1 text-sm font-normal text-gray-600">
                {data.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default CategoriesCard;
