// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { MongoDBAdapterOptions, MongoDBAdapterParams } from '@feathersjs/mongodb'
import { MongoDBService } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Balance, BalanceData, BalancePatch, BalanceQuery } from './schema'

export type { Balance, BalanceData, BalancePatch, BalanceQuery }

// eslint-disable-next-line
export interface BalanceParams extends MongoDBAdapterParams<BalanceQuery> { }

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class BalanceService<ServiceParams extends Params = BalanceParams> extends MongoDBService<
  Balance,
  BalanceData,
  BalanceParams,
  BalancePatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    id: 'uid',
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('balances'))
  }
}
