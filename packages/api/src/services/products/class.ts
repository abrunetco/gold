// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { MongoDBAdapterOptions, MongoDBAdapterParams } from '@feathersjs/mongodb'
import { MongoDBService } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Product, ProductData, ProductPatch, ProductQuery } from './schema'

export type { Product, ProductData, ProductPatch, ProductQuery }

// eslint-disable-next-line
export interface ProductParams extends MongoDBAdapterParams<ProductQuery> { }

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ProductService<ServiceParams extends Params = ProductParams> extends MongoDBService<
  Product,
  ProductData,
  ProductParams,
  ProductPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('products'))
  }
}
