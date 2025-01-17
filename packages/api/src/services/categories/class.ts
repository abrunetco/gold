// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import type { MongoDBAdapterOptions, MongoDBAdapterParams } from '@feathersjs/mongodb'
import { MongoDBService } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Category, CategoryData, CategoryPatch, CategoryQuery } from './schema'

export type { Category, CategoryData, CategoryPatch, CategoryQuery }

// eslint-disable-next-line
export interface CategoryParams extends MongoDBAdapterParams<CategoryQuery> { }

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class CategoryService<ServiceParams extends Params = CategoryParams> extends MongoDBService<
  Category,
  CategoryData,
  CategoryParams,
  CategoryPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    id: 'uid',
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('categories'))
  }
}
