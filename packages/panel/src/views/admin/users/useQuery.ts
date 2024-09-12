import { userPath, UserQuery } from "@gold/api";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import client from "api/client";

export default function useUserQuery (s: SortingState, f: ColumnFiltersState) {
  const sort: { [k: string]: -1 | 1 } = {}
  s.forEach(({ id, desc }) => { sort[id] = desc ? 1 : -1 })
  const filter: { [k: string]: any } = {}
  f.forEach(({ id, value }) => { filter[id] = value })

  function query (page: number): UserQuery {
    return {
      $limit: 10,
      $skip: page * 10,
      // @ts-ignore
      $sort: sort,
      ...filter
    }
  }
  return useInfiniteQuery({
    queryKey: ['users', s, f],
    queryFn: ({ pageParam }) => client.service(userPath).find({
      query: query(pageParam),
      mongodb: {
        collation: { locale: 'fa' }
      }
    }),
    placeholderData: keepPreviousData,
    initialPageParam: 0,
    maxPages: 100,
    getPreviousPageParam: ({ skip, limit }) => (~~(skip / limit) - 1),
    getNextPageParam: ({ skip, limit }) => (~~(skip / limit) + 1),
    refetchOnWindowFocus: false,
  })
}