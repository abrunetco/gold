import bcrypt from 'bcryptjs'
import { Db } from 'mongodb'
import getColections, { commons, generatorUID, userCommons } from './utils/collections'
import { User, userPath } from '../src/services/users/shared'
import { Genderypes } from '../src/shared/fragments/gender-types'

const EMAIL = 'ali.double.plus@gmail.com'

export const up = async (db: Db) => {
  const { users } = getColections(db)

  const userData: User = {
    ...commons(),
    uid: generatorUID,
    __typename: userPath,
    firstName: 'علی',
    lastName: 'قربانی',
    gender: Genderypes.MAN,
    email: EMAIL,
    password: await bcrypt.hash('123456', 10),
    googleId: '107831611195665651928',
    // avatar: "https://lh3.googleusercontent.com/a/ACg8ocLSEQRH4QsfCDrniJbZQmQG2gyW_8L-WiFVGtMGX0efwDE=s96-c",
    ...userCommons
  }

  await users.insertOne(userData)
}

export const down = async (db: Db) => {
  const { users } = getColections(db)
  await users.deleteOne({
    email: EMAIL
  })
}
