// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from "@feathersjs/feathers";
import { MongoDBService } from "@feathersjs/mongodb";
import type {
  MongoDBAdapterParams,
  MongoDBAdapterOptions,
} from "@feathersjs/mongodb";

import type { Application } from "../../declarations";
import type { Invoice, InvoiceData, InvoicePatch, InvoiceQuery } from "./schema";
import { Collection } from "mongodb";

export type { Invoice, InvoiceData, InvoicePatch, InvoiceQuery };

// eslint-disable-next-line
export interface InvoiceParams extends MongoDBAdapterParams<InvoiceQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class InvoiceService<
  ServiceParams extends Params = InvoiceParams,
> extends MongoDBService<Invoice, InvoiceData, InvoiceParams, InvoicePatch> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get("paginate"),
    Model: app.get("mongodbClient").then((db) => db.collection("invoices")),
  };
};
