// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { MongoDBAdapterOptions, MongoDBAdapterParams } from '@feathersjs/mongodb'
import { MongoDBService } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Setting, SettingData, SettingPatch, SettingQuery } from './schema'

export type { Setting, SettingData, SettingPatch, SettingQuery }

// eslint-disable-next-line
export interface SettingParams extends MongoDBAdapterParams<SettingQuery> { }

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class SettingService<ServiceParams extends Params = SettingParams> extends MongoDBService<
  Setting,
  SettingData,
  SettingParams,
  SettingPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    id: 'uid',
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('settings'))
  }
}
