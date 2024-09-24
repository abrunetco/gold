import { user } from './users'
import { category } from './categories'
import { product } from './products'
import { balance } from './balances'
import { invoice } from './invoices'
import { config } from './configs'
import { goldPrice } from './prices/gold'
import { setting } from './settings'
import { media } from './medias'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(user)
  app.configure(category)
  app.configure(product)
  app.configure(balance)
  app.configure(invoice)
  app.configure(goldPrice)
  app.configure(config)
  app.configure(setting)
  app.configure(media)
  // All services will be registered here
}
