// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  Media,
  mediaDataResolver,
  mediaDataValidator,
  mediaExternalResolver,
  mediaPatchResolver,
  mediaPatchValidator,
  mediaQueryResolver,
  mediaQueryValidator,
  mediaResolver
} from './schema'

import type { Application } from '../../declarations'
import { commonDataResolver, commonPatchResolver } from '../../resolvers/common'
import { MediaService, getOptions } from './class'
import { uploadParser } from './multer/parser'
import koaMulterUploader from './multer/uploader'
import { mediaMethods, mediaPath } from './shared'
import { checkAuthenticate } from './multer/auth'
import { ONBOARD_MEDIA_TASK } from '../../tasks/onboard-media/schema'
import { alterItems, iff } from 'feathers-hooks-common'
import { serveAsFile } from './multer/serve'

export * from './class'
export * from './schema'

// A configure function that registers the service and its hooks via `app.configure`
export const media = (app: Application) => {
  // Register our service on the Feathers application
  app.use(mediaPath, new MediaService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: mediaMethods,
    // You can add additional custom events to be sent to clients here
    events: [],
    koa: {
      before: [checkAuthenticate(app), koaMulterUploader, uploadParser],
      after: [serveAsFile]
    }
  })
  // Initialize hooks
  app.service(mediaPath).hooks({
    around: {
      all: [
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
        iff(authenticate('jwt')),
        // (ctxt) => {
        //   ctxt.params.pipeline = ctxt.params.query?.net ? netPpipeline : pipeline
        //   delete ctxt.params.query?.net
        // },
        schemaHooks.validateQuery(mediaQueryValidator),
        schemaHooks.resolveQuery(mediaQueryResolver)
      ],
      find: [authenticate('jwt')],
      get: [],
      create: [
        authenticate('jwt'),
        schemaHooks.validateData(mediaDataValidator),
        schemaHooks.resolveData(mediaDataResolver),
        schemaHooks.resolveData(commonDataResolver)
      ],
      patch: [
        authenticate('jwt'),
        schemaHooks.validateData(mediaPatchValidator),
        schemaHooks.resolveData(mediaPatchResolver),
        schemaHooks.resolveData(commonPatchResolver)
      ],
      remove: [authenticate('jwt')]
    },
    after: {
      all: [],
      create: [
        alterItems((item: Media, ctxt) => {
          const queue = ctxt.app.get(ONBOARD_MEDIA_TASK)

          const job = queue.createJob({ media: item.uid })
          job.save()
        })
      ]
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
