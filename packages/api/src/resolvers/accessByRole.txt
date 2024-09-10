import { accessibleBy } from "@casl/mongoose";
import { HookContext, Params } from "@feathersjs/feathers";
import { PropertyResolver } from "@feathersjs/schema";
import { Actions } from "@sms/defs/src/rules/subjects";
import { MODEL_KEYS, VIEW_KEYS } from "@sms/defs/src/service-keys";
import _ from "lodash";

export function accessResolver<C extends HookContext>
(sub: MODEL_KEYS | VIEW_KEYS): PropertyResolver<any, any[], C> {
  return async ($and, _query, ctxt, { path }) => {
    console.assert(path[0] === '$and')
    const params: Params = ctxt.params
    if (params.ability) {
      const q = accessibleBy(params.ability, Actions.list)[sub]
      // console.log('usersAccessResolver::2', JSON.stringify(q, null, 2), params.access)
      if (_.keys(q).length) {
        return [...($and ?? []), q]
      }
    }
    return $and
  }
}