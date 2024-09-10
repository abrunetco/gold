// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from "@feathersjs/feathers";
import { MongoDBService } from "@feathersjs/mongodb";
import type {
  MongoDBAdapterParams,
  MongoDBAdapterOptions,
} from "@feathersjs/mongodb";

import type { Application } from "../../declarations";
import type { Product, ProductData, ProductPatch, ProductQuery } from "./schema";
import { Collection } from "mongodb";

export type { Product, ProductData, ProductPatch, ProductQuery };

// eslint-disable-next-line
export interface ProductParams extends MongoDBAdapterParams<ProductQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class ProductService<
  ServiceParams extends Params = ProductParams,
> extends MongoDBService<Product, ProductData, ProductParams, ProductPatch> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get("paginate"),
    Model: app.get("mongodbClient").then((db) => db.collection("products")),
  };
};
