import _ from 'lodash'

const configKeys = ['$limit', '$sort', '$select', '$skip']

export function extendQuery<Q extends { [k: string | number | symbol]: any }>(q1: Q, q2: Q): Q {
  if (q1.$and && Array.isArray(q1.$and)) {
    if (q1.$and.some((q) => _.isEqual(q, q2))) return q1
    return { ...q1, $and: [...q1.$and, q2] }
  }
  const filters = _.omit(q1, configKeys)
  const queryConfig = _.pick(q1, configKeys)
  return { ...queryConfig, $and: [filters, q2] } as unknown as Q
}
