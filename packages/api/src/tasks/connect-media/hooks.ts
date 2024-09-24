import assert from 'assert'
import { HookContext } from '../../declarations'
import { CONNECT_MEDIA_TASK } from './schema'
import { Common, Entity, EntityName } from '../../client'
import { mediaFieldsInUserSchema } from '../../services/users'
import { mediaFieldsInCategorySchema } from '../../services/categories'
import { mediaFieldsInProductSchema } from '../../services/products'

const fieldsMap: { [P in EntityName]: Array<Exclude<keyof Entity<P>, keyof Common>> | null } = {
  balances: null,
  configs: null,
  categories: mediaFieldsInCategorySchema,
  gold_prices: null,
  invoices: null,
  medias: null,
  products: mediaFieldsInProductSchema,
  settings: null,
  users: mediaFieldsInUserSchema
}

export default function connectMedia<H extends HookContext>() {
  return async (record: Common, ctxt: H): Promise<any> => {
    if (ctxt.path === 'authentication') return
    const fields = ctxt.path in fieldsMap ? fieldsMap[ctxt.path] : null
    if (!fields) return

    assert(ctxt.type === 'after')
    assert(['create', 'patch', 'remove'].includes(ctxt.method))

    const queue = ctxt.app.get(CONNECT_MEDIA_TASK)
    const job = queue.createJob({ fields, service: ctxt.path, uid: record.uid })
    await job.save()
  }
}
