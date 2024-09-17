// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type {
  AdapterId,
  MongoDBAdapterOptions,
  MongoDBAdapterParams,
  NullableAdapterId
} from '@feathersjs/mongodb'
import { MongoDBService } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Config, ConfigData, ConfigPatch, ConfigQuery } from './schema'
import { configPath } from './shared'

export type { Config, ConfigData, ConfigPatch, ConfigQuery }

// eslint-disable-next-line
export interface ConfigParams extends MongoDBAdapterParams<ConfigQuery> { }

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.

export class ConfigService<ServiceParams extends Params = ConfigParams> extends MongoDBService<
  Config,
  ConfigData,
  ConfigParams,
  ConfigPatch
> {
  async get(_id: AdapterId, params?: ConfigParams): Promise<Config> {
    return super.get(configPath, params)
  }

  patch(id: null, data: ConfigPatch, params?: ServiceParams): Promise<Config[]>
  patch(id: AdapterId, data: ConfigPatch, params?: ServiceParams): Promise<Config>
  async patch(_id: NullableAdapterId, data: ConfigPatch, params?: ConfigParams): Promise<Config | Config[]> {
    return super.patch(configPath, data, params)
  }
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    id: 'uid',
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('configs'))
  }
}
