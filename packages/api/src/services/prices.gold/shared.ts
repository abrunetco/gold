// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from "@feathersjs/feathers";
import type { ClientApplication } from "../../client";
import type {
  GoldPrice,
  GoldPriceData,
  GoldPricePatch,
  GoldPriceQuery,
  GoldPriceService,
} from "./class";

export type { GoldPrice, GoldPriceData, GoldPricePatch, GoldPriceQuery };

export type GoldPriceClientService = Pick<
  GoldPriceService<Params<GoldPriceQuery>>,
  (typeof goldPriceMethods)[number]
>;

export const goldPricePath = "gold_prices" as const

export const goldPriceMethods: Array<keyof GoldPriceService> = [
  "find",
  "get",
  "create",
  "patch",
  "remove",
];

export const goldPriceClient = (client: ClientApplication) => {
  const connection = client.get("connection");

  client.use(goldPricePath, connection.service(goldPricePath), {
    methods: goldPriceMethods,
  });
};

// Add this service to the client service type index
declare module "../../client" {
  interface ServiceTypes {
    [goldPricePath]: GoldPriceClientService;
  }
}
