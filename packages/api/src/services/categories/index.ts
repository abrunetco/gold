// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  categoryDataValidator,
  categoryPatchValidator,
  categoryQueryValidator,
  categoryResolver,
  categoryExternalResolver,
  categoryDataResolver,
  categoryPatchResolver,
  categoryQueryResolver
} from './schema'

import type { Application } from '../../declarations'
import { CategoryService, getOptions } from './class'
import { categoryPath, categoryMethods } from './shared'
import { commonDataResolver, commonPatchResolver } from '../../resolvers/common'

export * from './class'
export * from './schema'

// A configure function that registers the service and its hooks via `app.configure`
export const category = (app: Application) => {
  // Register our service on the Feathers application
  app.use(categoryPath, new CategoryService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: categoryMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(categoryPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        // schemaHooks.resolveExternal(authManagementExternalResolver),
        schemaHooks.resolveExternal(categoryExternalResolver),
        schemaHooks.resolveResult(categoryResolver)
      ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    before: {
      all: [
        schemaHooks.validateQuery(categoryQueryValidator),
        schemaHooks.resolveQuery(categoryQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(categoryDataValidator),
        schemaHooks.resolveData(categoryDataResolver),
        schemaHooks.resolveData(commonDataResolver)
      ],
      patch: [
        schemaHooks.validateData(categoryPatchValidator),
        schemaHooks.resolveData(categoryPatchResolver),
        schemaHooks.resolveData(commonPatchResolver)
      ],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [categoryPath]: CategoryService
  }
}
