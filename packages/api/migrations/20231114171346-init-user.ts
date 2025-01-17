import bcrypt from 'bcryptjs'
import { Db } from 'mongodb'
import { Config, configPath } from '../src/client'
import { User, userPath } from '../src/services/users/shared'
import { Genderypes } from '../src/shared/fragments/gender-types'
import { RoleTypes } from '../src/shared/fragments/role-types'
import getColections, { commons, generatorUID, userCommons } from './utils/collections'

const EMAIL = 'ali.double.plus@gmail.com'

export const up = async (db: Db) => {
  const { users, configs } = getColections(db)

  const userData: User = {
    ...commons(),
    uid: generatorUID,
    _typename: userPath,
    firstName: 'علی',
    lastName: 'قربانی',
    gender: Genderypes.MAN,
    role: RoleTypes.ADMIN,
    email: EMAIL,
    password: await bcrypt.hash('123456', 10),
    googleId: '107831611195665651928',
    // avatar: "https://lh3.googleusercontent.com/a/ACg8ocLSEQRH4QsfCDrniJbZQmQG2gyW_8L-WiFVGtMGX0efwDE=s96-c",
    ...userCommons
  }

  const configData: Config = {
    ...commons(),
    uid: configPath,
    _typename: configPath,
    siteSeoConfig: {
      title: 'صرافی جروقی',
      description: 'فروش آنلاین طلا'
    },
    goldPriceConfig: {
      mode: 'channel',
      fixed: { value: 100000 },
      percent: { value: 0 }
    }
  }

  await configs.insertOne(configData)
  await users.insertOne(userData)
}

export const down = async (db: Db) => {
  const { users } = getColections(db)
  await users.deleteOne({
    email: EMAIL
  })
}
