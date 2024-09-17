// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Paginated, PaginationOptions, Params } from '@feathersjs/feathers'
import type { MongoDBAdapterOptions, MongoDBAdapterParams } from '@feathersjs/mongodb'
import { MongoDBService } from '@feathersjs/mongodb'

import type { Application } from '../../../declarations'
import {
  CandleTypes,
  type GoldPrice,
  type GoldPriceData,
  type GoldPricePatch,
  type GoldPriceQuery
} from './schema'
import { getCandlePipeline } from './pipeline'
import { goldPricePath } from './shared'

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
> {
  async get(_id: 'last', params?: GoldPriceParams): Promise<GoldPrice> {
    const find = await this.find({
      ...params,
      query: {
        $limit: 1,
        $sort: { createdAt: -1 } as any,
        candle: CandleTypes.mm
      }
    })
    return find.data[0]
  }

  find(params?: GoldPriceParams & { paginate?: PaginationOptions }): Promise<Paginated<GoldPrice>>
  find(params?: GoldPriceParams & { paginate: false }): Promise<GoldPrice[]>
  async find(
    params?: GoldPriceParams & { paginate?: PaginationOptions | false }
  ): Promise<Paginated<GoldPrice> | GoldPrice[]> {
    const findParams: GoldPriceParams = { ...params }
    const query = params ? this.filterQuery(null, params).query : {}
    findParams.pipeline = getCandlePipeline(query?.candle ?? CandleTypes.m)
    delete findParams.query?.candle
    return super.find(findParams)
  }
}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    id: 'uid',
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection(goldPricePath))
  }
}
