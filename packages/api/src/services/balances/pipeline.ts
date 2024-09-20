export const pipeline = [
  {
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: 'uid',
      as: 'u'
    }
  },
  { $unwind: '$u' },
  {
    $set: { userLabel: { $concat: ['$u.firstName', ' ', '$u.lastName'] } }
  },
  { $project: { u: 0 } },
  { $feathers: true }
]

export const netPpipeline = [
  {
    $group: {
      _id: '$user',
      value: { $sum: '$value' },
      number: { $last: '$number' },
      createdAt: { $last: '$createdAt' },
      uid: { $first: '$user' },
      user: { $first: '$user' }
    }
  },
  {
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: 'uid',
      as: 'u'
    }
  },
  { $unwind: '$u' },
  {
    $set: {
      userLabel: { $concat: ['$u.firstName', ' ', '$u.lastName'] },
      readonly: true,
      __typename: 'balances'
    }
  },
  { $project: { u: 0 } },
  { $feathers: true }
]
