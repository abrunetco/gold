// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  mediaDataValidator,
  mediaPatchValidator,
  mediaQueryValidator,
  mediaResolver,
  mediaExternalResolver,
  mediaDataResolver,
  mediaPatchResolver,
  mediaQueryResolver
} from './schema'

import type { Application } from '../../declarations'
import { MediaService, getOptions } from './class'
import { mediaPath, mediaMethods } from './shared'
import { commonDataResolver, commonPatchResolver } from '../../resolvers/common'
import { netPpipeline, pipeline } from './pipeline'

export * from './class'
export * from './schema'

// A configure function that registers the service and its hooks via `app.configure`
export const media = (app: Application) => {
  // Register our service on the Feathers application
  app.use(mediaPath, new MediaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: mediaMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(mediaPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        // schemaHooks.resolveExternal(authManagementExternalResolver),
        schemaHooks.resolveExternal(mediaExternalResolver),
        schemaHooks.resolveResult(mediaResolver)
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
        (ctxt) => {
          ctxt.params.pipeline = ctxt.params.query?.net ? netPpipeline : pipeline
          delete ctxt.params.query?.net
        },
        schemaHooks.validateQuery(mediaQueryValidator),
        schemaHooks.resolveQuery(mediaQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(mediaDataValidator),
        schemaHooks.resolveData(mediaDataResolver),
        schemaHooks.resolveData(commonDataResolver)
      ],
      patch: [
        schemaHooks.validateData(mediaPatchValidator),
        schemaHooks.resolveData(mediaPatchResolver),
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
    [mediaPath]: MediaService
  }
}
