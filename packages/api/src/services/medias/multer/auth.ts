import { NotAuthenticated } from '@feathersjs/errors'
import { Koa } from '@feathersjs/koa'
import { Application } from '../../../declarations'

export const checkAuthenticate =
  (app: Application): Koa.Middleware =>
  async (ctx, next) => {
    if (ctx.method === 'GET') return next()
    const authorization = ctx.request.header['authorization'] ?? ctx.request.header['Authorization'] ?? ''
    const bearer = Array.isArray(authorization) ? authorization.pop() : authorization
    const accessToken = bearer?.split(' ').pop() ?? ''
    const authService = app.defaultAuthentication?.()
    if (!authService || typeof authService.authenticate !== 'function') {
      throw new NotAuthenticated('Could not find a valid authentication service')
    }
    const config = app.get('authentication')
    await authService.verifyAccessToken(accessToken, config?.jwtOptions, config?.secret)

    return next()
  }
