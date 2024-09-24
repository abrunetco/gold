import { Job } from 'bee-queue'
import { Application } from '../../declarations'
import { CRONS_TASK, TaskData, TaskResult } from './schema'

export const handler = (app: Application) =>
  async function (job: Job<TaskData>): Promise<TaskResult> {
    console.log(CRONS_TASK, 'is done', job.id, job.data.task)
    // TODO: remove stail media records and files
    return job.data
  }
