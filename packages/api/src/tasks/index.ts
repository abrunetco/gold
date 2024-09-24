import { connectMediaTask } from './connect-media'
import { cronTask } from './crons'
import { onboardMediaTask } from './onboard-media'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const tasks = (app: Application) => {
  app.configure(onboardMediaTask)
  app.configure(connectMediaTask)
  app.configure(cronTask)
}
