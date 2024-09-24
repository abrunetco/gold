import { Application } from '../../declarations'
import { CRONS_TASK } from './schema'

const apikey = 'iKo7j5zVy5QuvHFFkfewENMUd1IWL2ro'

export const cronsMiddleware = (app: Application) => {
  app.use(async (ctx, next) => {
    const task = Array.isArray(ctx.req.headers['task']) ? ctx.req.headers['task'][0] : ctx.req.headers['task']
    if (ctx.req.url?.startsWith('/cron') && ctx.req.headers['apikey'] === apikey && task) {
      const queue = app.get(CRONS_TASK)
      const job = queue.createJob({ task })
      console.log(CRONS_TASK, 'adding task')
      await job.save()

      ctx.body = 'ok'
      ctx.status = 200
    }
    next()
  })
}
