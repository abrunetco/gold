import { Document } from 'bson'
import { CandleTypes } from './schema'

function makeConcatArray(...keys: Array<'m' | 'w' | 'd' | 'hh' | 'mm'>) {
  return ['y', ...keys]
    .map((k) => `$jDate.${k}`)
    .join(' - ')
    .split(' ')
}

const CandleTypeMap = {
  [CandleTypes.m]: makeConcatArray('m'),
  [CandleTypes.w]: makeConcatArray('m', 'w'),
  [CandleTypes.d]: makeConcatArray('m', 'd'),
  [CandleTypes.hh]: makeConcatArray('m', 'd', 'hh'),
  [CandleTypes.mm]: makeConcatArray('m', 'd', 'hh', 'mm')
} as const

export function getCandlePipeline(candle: CandleTypes = CandleTypes.m): Document[] {
  return [
    {
      $project: {
        candle: { $concat: CandleTypeMap[candle] },
        v: 1,
        createdAt: 1,
        jDate: 1
      }
    },
    { $sort: { createdAt: 1 } },
    {
      $group: {
        _id: '$candle',
        createdAt: { $first: '$createdAt' },
        s: { $sum: 1 },
        c: { $first: '$v' },
        o: { $last: '$v' },
        h: { $max: '$v' },
        l: { $min: '$v' }
      }
    },
    {
      $set: {
        createdAt: { $toDate: '$createdAt' },
        uid: '$_id',
        v: '$c',
        candle: {
          o: '$o',
          c: '$c',
          h: '$h',
          l: '$l',
          s: '$s'
        }
      }
    },
    {
      $project: {
        s: 0,
        o: 0,
        c: 0,
        h: 0,
        l: 0
      }
    },
    { $sort: { createdAt: 1 } },
    { $feathers: true }
  ]
}
