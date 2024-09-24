import { Job } from 'bee-queue'
import { Document } from 'mongodb'
import { Media } from '../../client'
import { Application } from '../../declarations'
import { CONNECT_MEDIA_TASK, TaskData, TaskResult } from './schema'

export const handler = (app: Application) =>
  async function (job: Job<TaskData>): Promise<TaskResult> {
    const { service, uid, fields } = job.data
    const db = await app.get('mongodbClient')
    const EntityModel = db.collection(service)
    const MediaModel = db.collection<Media>('medias')

    const entity = (await EntityModel.findOne({ uid })) || ({} as Document)

    const effectedMedia: string[] = []
    for (const field of fields) {
      if (field in entity) {
        const ids = Array.isArray(entity[field]) ? entity[field] : [entity[field]]
        effectedMedia.push(...ids)
      }
    }
    await MediaModel.updateMany({ refs: uid }, { $pullAll: { refs: [uid] } })
    await MediaModel.updateMany({ uid: { $in: effectedMedia } }, { $addToSet: { refs: uid } })

    console.log(CONNECT_MEDIA_TASK, 'is done:', job.id)

    return {
      effectedMedia
    }
  }
