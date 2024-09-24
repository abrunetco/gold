import { Koa } from '@feathersjs/koa'
import { Media } from '../schema'
import { mediaPath } from '../shared'
import fs from 'fs'
import sharp from 'sharp'

export const serveAsFile: Koa.Middleware = async (ctx, next) => {
  const acceptImage = ctx.request.header['accept']?.startsWith('image')
  if (acceptImage && isMedia(ctx.body)) {
    const media = ctx.body
    ctx.response.set('content-type', media.mimetype)
    const stream = sharp()
    ctx.body = stream

    const src = fs.createReadStream(media.path)
    src.pipe(stream)
  }
  return next()
}

function isMedia(body: any): body is Media {
  return body?._typename === mediaPath
}
