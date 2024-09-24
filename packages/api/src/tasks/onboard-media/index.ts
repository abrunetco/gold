import Queue from 'bee-queue'
import { Application } from '../../declarations'
import { handler } from './handler'
import { ONBOARD_MEDIA_TASK, TaskData } from './schema'

export const onboardMediaTask = async (app: Application) => {
  const url = app.get('redis')
  const queue = new Queue<TaskData>(ONBOARD_MEDIA_TASK, { redis: { url } })

  queue.process(handler(app))

  app.set(ONBOARD_MEDIA_TASK, queue)
}

declare module '../../declarations' {
  interface Configuration {
    [ONBOARD_MEDIA_TASK]: Queue<TaskData>
  }
}
