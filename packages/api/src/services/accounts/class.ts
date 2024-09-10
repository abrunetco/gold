// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from "@feathersjs/feathers";
import { MongoDBService } from "@feathersjs/mongodb";
import type {
  MongoDBAdapterParams,
  MongoDBAdapterOptions,
} from "@feathersjs/mongodb";

import type { Application } from "../../declarations";
import type { Account, AccountData, AccountPatch, AccountQuery } from "./schema";
import { Collection } from "mongodb";

export type { Account, AccountData, AccountPatch, AccountQuery };

// eslint-disable-next-line
export interface AccountParams extends MongoDBAdapterParams<AccountQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class AccountService<
  ServiceParams extends Params = AccountParams,
> extends MongoDBService<Account, AccountData, AccountParams, AccountPatch> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get("paginate"),
    Model: app.get("mongodbClient").then((db) => db.collection("accounts")),
  };
};
