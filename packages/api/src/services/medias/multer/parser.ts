import { Koa } from '@feathersjs/koa'
import { MediaData } from '../class'

export const uploadParser: Koa.Middleware = async (ctx, next) => {
  if (ctx.method === 'GET') return next()
  const { type, name, isProtected, ...meta } = ctx.request.body
  console.log({ isProtected }, typeof isProtected)

  const data: MediaData = {
    encoding: ctx.file.encoding,
    mimetype: ctx.file.mimetype ?? type,
    destination: ctx.file.destination,
    filename: ctx.file.filename ?? name,
    path: ctx.file.path,
    size: ctx.file.size,
    isProtected: isProtected === 'true' || isProtected === true,
    meta
  }
  ctx.request.body = data
  await next()
}
