// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from "@feathersjs/feathers";
import { MongoDBService } from "@feathersjs/mongodb";
import type {
  MongoDBAdapterParams,
  MongoDBAdapterOptions,
} from "@feathersjs/mongodb";

import type { Application } from "../../../declarations";
import type { GoldPrice, GoldPriceData, GoldPricePatch, GoldPriceQuery } from "./schema";
import { Collection } from "mongodb";

export type { GoldPrice, GoldPriceData, GoldPricePatch, GoldPriceQuery };

// eslint-disable-next-line
export interface GoldPriceParams extends MongoDBAdapterParams<GoldPriceQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class GoldPriceService<
  ServiceParams extends Params = GoldPriceParams,
> extends MongoDBService<GoldPrice, GoldPriceData, GoldPriceParams, GoldPricePatch> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get("paginate"),
    Model: app.get("mongodbClient").then((db) => db.collection("goldPrices")),
  };
};
