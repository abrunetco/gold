// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService, type MongoDBAdapterOptions, type MongoDBAdapterParams } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Media, MediaData, MediaPatch, MediaQuery } from './schema'

export type { Media, MediaData, MediaPatch, MediaQuery }

// eslint-disable-next-line
export interface MediaParams extends MongoDBAdapterParams<MediaQuery> { }

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class MediaService<ServiceParams extends Params = MediaParams> extends MongoDBService<
  Media,
  MediaData,
  MediaParams,
  MediaPatch
> {
  // create(data: MediaData, params?: ServiceParams): Promise<Media>
  // create(data: MediaData[], params?: ServiceParams): Promise<Media[]>
  // create(data: MediaData | MediaData[], params?: ServiceParams): Promise<Media | Media[]> {
  //   if (Array.isArray(data)) return Promise.all(data.map((d) => super.create(d, params)))
  //   console.log('innnnnner', data)
  //   return super.create(data, params)
  // }
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    id: 'uid',
    multi: true,
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('medias'))
  }
}
