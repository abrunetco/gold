// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { MongoDBAdapterOptions, MongoDBAdapterParams } from '@feathersjs/mongodb'
import { MongoDBService } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import type { GoldPrice, GoldPriceData, GoldPricePatch, GoldPriceQuery } from './schema'

export type { GoldPrice, GoldPriceData, GoldPricePatch, GoldPriceQuery }

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface GoldPriceParams extends MongoDBAdapterParams<GoldPriceQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class GoldPriceService<ServiceParams extends Params = GoldPriceParams> extends MongoDBService<
  GoldPrice,
  GoldPriceData,
  GoldPriceParams,
  GoldPricePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('goldPrices'))
  }
}
