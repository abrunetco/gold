// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import { createClient } from 'redis'
import type { Application } from './declarations'

type RedisClient = ReturnType<typeof createClient>

declare module './declarations' {
  interface Configuration {
    redisClient: Promise<RedisClient>
  }
}

export const redis = (app: Application) => {
  const url = app.get('redis')

  const redisClient = createClient({ url })

  redisClient.on('error', (err: any) => console.log('Redis Client Error', err))
  redisClient.on('connect', () => console.log('Redis Client Connected', url))
  redisClient.on('ready', () => console.log('Redis Client is Ready'))

  app.set('redisClient', redisClient.connect())
}
