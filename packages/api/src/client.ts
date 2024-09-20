// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application, ServiceMixin } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

export { balancePath } from './services/balances/shared'
import { Balance, balancePath } from './services/balances/shared'
import { balanceClient } from './services/balances/shared'
export type { Balance, BalanceData, BalanceQuery, BalancePatch } from './services/balances/shared'

export { categoryPath } from './services/categories/shared'
import { Category, categoryPath } from './services/categories/shared'
import { categoryClient } from './services/categories/shared'
export type { Category, CategoryData, CategoryQuery, CategoryPatch } from './services/categories/shared'

export { invoicePath } from './services/invoices/shared'
import { Invoice, invoicePath } from './services/invoices/shared'
import { invoiceClient } from './services/invoices/shared'
export type { Invoice, InvoiceData, InvoiceQuery, InvoicePatch } from './services/invoices/shared'

export { goldPricePath } from './services/prices/gold/shared'
import { GoldPrice, goldPricePath } from './services/prices/gold/shared'
import { goldPriceClient } from './services/prices/gold/shared'
export type { GoldPrice, GoldPriceData, GoldPriceQuery, GoldPricePatch } from './services/prices/gold/shared'

export { productPath } from './services/products/shared'
import { Product, productPath } from './services/products/shared'
import { productClient } from './services/products/shared'
export type { Product, ProductData, ProductQuery, ProductPatch } from './services/products/shared'

export { userPath } from './services/users/shared'
import { User, userPath } from './services/users/shared'
import { userClient } from './services/users/shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/shared'

export { configPath } from './services/configs/shared'
import { Config, configPath } from './services/configs/shared'
import { configClient } from './services/configs/shared'
export type { Config, ConfigData, ConfigQuery, ConfigPatch } from './services/configs/shared'

export { settingPath } from './services/settings/shared'
import { Setting, settingPath } from './services/settings/shared'
import { settingClient } from './services/settings/shared'
export type { Setting, SettingData, SettingQuery, SettingPatch } from './services/settings/shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type, prettier/prettier
export interface ServiceTypes { }

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the api2 app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = (
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {},
  mixin?: ClientMixin
) => {
  const client: ClientApplication = feathers()

  if (mixin) client.mixins.push(mixin)

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(balanceClient)
  client.configure(categoryClient)
  client.configure(invoiceClient)
  client.configure(goldPriceClient)
  client.configure(productClient)
  client.configure(userClient)
  client.configure(configClient)
  client.configure(settingClient)
  return client
}

export type ClientMixin = ServiceMixin<ClientApplication>
export type { AuthenticationParams } from './declarations'

interface EntitiesMap {
  [balancePath]: Balance
  [categoryPath]: Category
  [invoicePath]: Invoice
  [goldPricePath]: GoldPrice
  [productPath]: Product
  [userPath]: User
  [configPath]: Config
  [settingPath]: Setting
}

export type EntityName = keyof EntitiesMap
// | typeof accountPath
// | typeof balancePath
// | typeof categoryPath
// | typeof invoicePath
// | typeof goldPricePath
// | typeof productPath
// | typeof userPath
// | typeof configPath
// | typeof settingPath

export type { Common } from './shared/common'
export type { Paginated } from '@feathersjs/feathers'

export type Entity<N extends EntityName> = EntitiesMap[N]
