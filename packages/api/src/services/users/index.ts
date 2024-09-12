// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from "@feathersjs/authentication";

import { hooks as schemaHooks } from "@feathersjs/schema";

import {
  userDataValidator,
  userPatchValidator,
  userQueryValidator,
  userResolver,
  userExternalResolver,
  userDataResolver,
  userPatchResolver,
  userQueryResolver,
} from "./schema";

import type { Application } from "../../declarations";
import { UserService, getOptions } from "./class";
import { userPath, userMethods } from "./shared";
import { commonDataResolver, commonPatchResolver } from "../../resolvers/common";

export * from "./class";
export * from "./schema";

// A configure function that registers the service and its hooks via `app.configure`
export const user = (app: Application) => {
  // Register our service on the Feathers application
  app.use(userPath, new UserService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  });
  // Initialize hooks
  app.service(userPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        // schemaHooks.resolveExternal(authManagementExternalResolver),
        schemaHooks.resolveExternal(userExternalResolver),
        schemaHooks.resolveResult(userResolver),
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
        schemaHooks.validateQuery(userQueryValidator),
        schemaHooks.resolveQuery(userQueryResolver),
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(userDataValidator),
        schemaHooks.resolveData(userDataResolver),
        schemaHooks.resolveData(commonDataResolver)
      ],
      patch: [
        schemaHooks.validateData(userPatchValidator),
        schemaHooks.resolveData(userPatchResolver),
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
    [userPath]: UserService;
  }
}
