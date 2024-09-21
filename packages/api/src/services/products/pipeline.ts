import { categoryPath } from '../categories/shared'

export const pipeline = [
  { $feathers: true },
  {
    $lookup: {
      from: categoryPath,
      localField: 'category',
      foreignField: 'uid',
      as: '_category',
      pipeline: [
        {
          $project: {
            _id: 0,
            _typename: categoryPath,
            uid: 1,
            title: 1,
            describtion: 1,
            image: 1
          }
        }
      ]
    }
  },
  { $unwind: { path: '$_category', preserveNullAndEmptyArrays: true } }
]
