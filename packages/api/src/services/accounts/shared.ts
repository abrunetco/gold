// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Account, AccountData, AccountPatch, AccountQuery, AccountService } from './class'

export type { Account, AccountData, AccountPatch, AccountQuery }

export type AccountClientService = Pick<AccountService<Params<AccountQuery>>, (typeof accountMethods)[number]>

export const accountPath = 'accounts' as const

export const accountMethods: Array<keyof AccountService> = ['find', 'get', 'create', 'patch', 'remove']

export const accountClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(accountPath, connection.service(accountPath), {
    methods: accountMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [accountPath]: AccountClientService
  }
}
