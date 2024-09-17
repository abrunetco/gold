// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  configExternalResolver,
  configPatchResolver,
  configPatchValidator,
  configQueryResolver,
  configQueryValidator,
  configResolver
} from './schema'

import { NotImplemented } from '@feathersjs/errors'
import type { Application } from '../../declarations'
import { commonPatchResolver } from '../../resolvers/common'
import { ConfigService, getOptions } from './class'
import { configMethods, configPath } from './shared'

export * from './class'
export * from './schema'

// A configure function that registers the service and its hooks via `app.configure`
export const config = (app: Application) => {
  // Register our service on the Feathers application
  app.use(configPath, new ConfigService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: configMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(configPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        // schemaHooks.resolveExternal(authManagementExternalResolver),
        schemaHooks.resolveExternal(configExternalResolver),
        schemaHooks.resolveResult(configResolver)
      ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    before: {
      all: [schemaHooks.validateQuery(configQueryValidator), schemaHooks.resolveQuery(configQueryResolver)],
      find: [],
      get: [],
      create: [
        () => {
          throw new NotImplemented()
        }
      ],
      patch: [
        schemaHooks.validateData(configPatchValidator),
        schemaHooks.resolveData(commonPatchResolver),
        schemaHooks.resolveData(configPatchResolver)
      ],
      remove: [
        () => {
          throw new NotImplemented()
        }
      ]
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
    [configPath]: ConfigService
  }
}
