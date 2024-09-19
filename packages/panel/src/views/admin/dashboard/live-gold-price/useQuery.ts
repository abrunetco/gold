import { goldPricePath, GoldPriceQuery } from "@gold/api";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import client from "api/client";

export type CandleTypes = "m" | "w" | "d" | "hh" | "mm";

export default function useGoldPriceQuery(candle: CandleTypes) {
  function query(page: number): GoldPriceQuery {
    return {
      $limit: 50,
      $skip: page * 10,
      candle: candle as any,
    };
  }
  return useInfiniteQuery({
    queryKey: [goldPricePath, candle],
    queryFn: ({ pageParam }) =>
      client.service(goldPricePath).find({
        query: query(pageParam),
        mongodb: {
          collation: { locale: "fa" },
        },
      }),
    placeholderData: keepPreviousData,
    initialPageParam: 0,
    maxPages: 100,
    getPreviousPageParam: ({ skip, limit }) => ~~(skip / limit) - 1,
    getNextPageParam: ({ skip, limit }) => ~~(skip / limit) + 1,
    refetchOnWindowFocus: false,
  });
}
