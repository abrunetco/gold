// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  settingDataValidator,
  settingPatchValidator,
  settingQueryValidator,
  settingResolver,
  settingExternalResolver,
  settingDataResolver,
  settingPatchResolver,
  settingQueryResolver
} from './schema'

import type { Application } from '../../declarations'
import { SettingService, getOptions } from './class'
import { settingPath, settingMethods } from './shared'
import { commonDataResolver, commonPatchResolver } from '../../resolvers/common'

export * from './class'
export * from './schema'

// A settingure function that registers the service and its hooks via `app.settingure`
export const setting = (app: Application) => {
  // Register our service on the Feathers application
  app.use(settingPath, new SettingService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: settingMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(settingPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        // schemaHooks.resolveExternal(authManagementExternalResolver),
        schemaHooks.resolveExternal(settingExternalResolver),
        schemaHooks.resolveResult(settingResolver)
      ],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    },
    before: {
      all: [schemaHooks.validateQuery(settingQueryValidator), schemaHooks.resolveQuery(settingQueryResolver)],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(settingDataValidator),
        schemaHooks.resolveData(settingDataResolver),
        schemaHooks.resolveData(commonDataResolver)
      ],
      patch: [
        schemaHooks.validateData(settingPatchValidator),
        schemaHooks.resolveData(settingPatchResolver),
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
    [settingPath]: SettingService
  }
}
