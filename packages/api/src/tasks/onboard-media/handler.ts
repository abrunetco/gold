import sharp from 'sharp'
import fs from 'fs'
import { mediaPath } from '../../client'
import { Application } from '../../declarations'
import { ONBOARD_MEDIA_TASK, TaskData, TaskResult } from './schema'
import { Job } from 'bee-queue'

export const handler = (app: Application) =>
  async function (job: Job<TaskData>): Promise<TaskResult> {
    const MediaService = app.service(mediaPath)
    const media = await MediaService.get(job.data.media)

    if (!media) throw new Error('media not exists')

    const [name, type] = media.filename.split('.')
    let suffix = type,
      mimetype = media.mimetype

    let pipe = sharp(media.path).rotate()

    const { width: w = 0, height: h = 0 } = await pipe.metadata(),
      ratio = h === 0 ? 1 : w / h,
      isVertical = h > w

    if (isVertical && h > 1024) {
      pipe = pipe.resize({ height: 1024 })
    } else if (!isVertical && w > 1024) {
      pipe = pipe.resize({ width: 1024 })
    }
    if (media.mimetype !== 'image/png') {
      if (media.mimetype !== 'image/webp') {
        mimetype = 'image/webp'
        suffix = 'webp'
        pipe = pipe.webp()
      }
    }
    const filename = `${name}.${suffix}`
    const path = `${media.destination}/${filename}`

    const { height, width, size } = await pipe.toFile(path + '.tmp')

    await MediaService.patch(job.data.media, {
      unboarded: 'done',
      filename,
      path,
      height,
      width,
      ratio,
      size,
      mimetype
    })

    await fs.promises.unlink(media.path)

    await fs.promises.rename(path + '.tmp', path)

    console.log(ONBOARD_MEDIA_TASK, 'is done', job.id, job.data)

    return job.data
  }
