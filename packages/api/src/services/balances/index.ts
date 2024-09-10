// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from "@feathersjs/authentication";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
  balanceDataValidator,
  balancePatchValidator,
  balanceQueryValidator,
  balanceResolver,
  balanceExternalResolver,
  balanceDataResolver,
  balancePatchResolver,
  balanceQueryResolver,
} from "./schema";

import type { Application } from "../../declarations";
import { BalanceService, getOptions } from "./class";
import { balancePath, balanceMethods } from "./shared";
import { commonDataResolver, commonPatchResolver } from "../../resolvers/common";

export * from "./class";
export * from "./schema";

// A configure function that registers the service and its hooks via `app.configure`
export const balance = (app: Application) => {
  // Register our service on the Feathers application
  app.use(balancePath, new BalanceService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: balanceMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
  });
  // Initialize hooks
  app.service(balancePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        // schemaHooks.resolveExternal(authManagementExternalResolver),
        schemaHooks.resolveExternal(balanceExternalResolver),
        schemaHooks.resolveResult(balanceResolver),
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
        schemaHooks.validateQuery(balanceQueryValidator),
        schemaHooks.resolveQuery(balanceQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(balanceDataValidator),
        schemaHooks.resolveData(balanceDataResolver),
        schemaHooks.resolveData(commonDataResolver)
      ],
      patch: [
        schemaHooks.validateData(balancePatchValidator),
        schemaHooks.resolveData(balancePatchResolver),
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
    [balancePath]: BalanceService;
  }
}
