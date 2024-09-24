import Queue from 'bee-queue'
import { Application } from '../../declarations'
import { handler } from './handler'
import { CONNECT_MEDIA_TASK, TaskData } from './schema'

export const connectMediaTask = async (app: Application) => {
  const url = app.get('redis')
  const queue = new Queue<TaskData>(CONNECT_MEDIA_TASK, { redis: { url } })

  queue.process(handler(app))

  app.set(CONNECT_MEDIA_TASK, queue)
}

declare module '../../declarations' {
  interface Configuration {
    [CONNECT_MEDIA_TASK]: Queue<TaskData>
  }
}
