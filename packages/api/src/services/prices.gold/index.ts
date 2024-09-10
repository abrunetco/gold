// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from "@feathersjs/authentication";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
  goldPriceDataValidator,
  goldPricePatchValidator,
  goldPriceQueryValidator,
  goldPriceResolver,
  goldPriceExternalResolver,
  goldPriceDataResolver,
  goldPricePatchResolver,
  goldPriceQueryResolver,
} from "./schema";

import type { Application } from "../../declarations";
import { GoldPriceService, getOptions } from "./class";
import { goldPricePath, goldPriceMethods } from "./shared";
import { commonDataResolver, commonPatchResolver } from "../../resolvers/common";

export * from "./class";
export * from "./schema";

// A configure function that registers the service and its hooks via `app.configure`
export const goldPrice = (app: Application) => {
  // Register our service on the Feathers application
  app.use(goldPricePath, new GoldPriceService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: goldPriceMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(goldPricePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        // schemaHooks.resolveExternal(authManagementExternalResolver),
        schemaHooks.resolveExternal(goldPriceExternalResolver),
        schemaHooks.resolveResult(goldPriceResolver),
      ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
    before: {
      all: [
        schemaHooks.validateQuery(goldPriceQueryValidator),
        schemaHooks.resolveQuery(goldPriceQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(goldPriceDataValidator),
        schemaHooks.resolveData(goldPriceDataResolver),
        schemaHooks.resolveData(commonDataResolver)
      ],
      patch: [
        schemaHooks.validateData(goldPricePatchValidator),
        schemaHooks.resolveData(goldPricePatchResolver),
        schemaHooks.resolveData(commonPatchResolver),
      ],
      remove: [],
    },
    after: {
      all: [],
    },
    error: {
      all: [],
    },
  });
};

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    [goldPricePath]: GoldPriceService;
  }
}
