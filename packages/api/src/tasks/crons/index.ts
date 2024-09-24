import Queue from 'bee-queue'
import { Application } from '../../declarations'
import { handler } from './handler'
import { CRONS_TASK, TaskData } from './schema'

export const cronTask = async (app: Application) => {
  const url = app.get('redis')
  const queue = new Queue<TaskData>(CRONS_TASK, { redis: { url } })

  queue.process(handler(app))

  app.set(CRONS_TASK, queue)
}

declare module '../../declarations' {
  interface Configuration {
    [CRONS_TASK]: Queue<TaskData>
  }
}
