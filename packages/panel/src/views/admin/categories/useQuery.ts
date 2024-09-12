import { CategoryQuery } from "@gold/api";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import client from "api/client";
import { categoryPath } from "@gold/api";

export default function useCategoryQuery (p: PaginationState, s: SortingState, f: ColumnFiltersState) {
  const sort: { [k: string]: -1 | 1 } = {}
  s.forEach(({ id, desc }) => { sort[id] = desc ? 1 : -1 })
  const filter: { [k: string]: any } = {}
  f.forEach(({ id, value }) => { filter[id] = value })
  const query: CategoryQuery = {
    $limit: p.pageSize,
    $skip: p.pageIndex * p.pageSize,
    $sort: sort,
    ...filter
  }
  return useQuery({
    queryKey: ['data', p, s],
    queryFn: () => client.service(categoryPath).find({query}),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  })
}