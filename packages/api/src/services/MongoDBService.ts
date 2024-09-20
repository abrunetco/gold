import { MongoDBAdapterParams, MongoDBService } from '@feathersjs/mongodb'
import { Document } from 'mongodb'

export class MongoDBService2<
  Result = any,
  Data = Partial<Result>,
  ServiceParams extends MongoDBAdapterParams<any> = MongoDBAdapterParams,
  PatchData = Partial<Data>
> extends MongoDBService<Result, Data, ServiceParams, PatchData> {
  async countAggregate(params: ServiceParams): Promise<number> {
    const model = await this.getModel(params)
    const pipeline = params.pipeline || []
    const index = pipeline.findIndex((stage: Document): boolean => stage.$feathers)
    const before = index >= 0 ? pipeline.slice(0, index) : []
    const after = index >= 0 ? pipeline.slice(index + 1) : pipeline

    const res = await model.aggregate([...before, ...after, { $count: 'total' }], params.mongodb).toArray()
    return res?.pop()?.total
  }

  async countDocuments(params: ServiceParams): Promise<number> {
    if (params.pipeline) {
      return this.countAggregate(params)
    }
    return super.countDocuments(params)
  }
}
