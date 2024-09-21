// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { MongoDBAdapterOptions, MongoDBAdapterParams } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import { MongoDBService2 } from '../MongoDBService'
import type { Media, MediaData, MediaPatch, MediaQuery } from './schema'

export type { Media, MediaData, MediaPatch, MediaQuery }

// eslint-disable-next-line
export interface MediaParams extends MongoDBAdapterParams<MediaQuery> { }

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class MediaService<ServiceParams extends Params = MediaParams> extends MongoDBService2<
  Media,
  MediaData,
  MediaParams,
  MediaPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    id: 'uid',
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('medias'))
  }
}
