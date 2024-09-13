import { faker } from '@faker-js/faker'
import { faker as faFaker } from '@faker-js/faker/locale/fa'
import { categoryPath, goldPricePath, User } from '../../src/client'
import { Genderypes } from '../../src/shared/fragments/gender-types'
import { Mediatypes } from '../../src/shared/fragments/media'
import { commons, userCommons, DataContext } from './collections'
import { userPath } from '../../src/services/users/shared'
import moment from 'moment-jalaali'

function makeDemoUser(): User {
  const email = faker.internet.email({ provider: 'test.gold.me' }),
    password = '$2a$10$q4UfToeeFyIZlAu7SrTr0OomYQc0qv60YUVG1TDi5ch2Eov1bNm2m' // === await bcrypt.hash("123456", 10)

  return {
    ...commons(),
    ...userCommons,
    __typename: userPath,
    firstName: faFaker.person.firstName(),
    lastName: faFaker.person.lastName(),
    avatar: [
      {
        id: 'external',
        type: Mediatypes.IMAGE,
        external: {
          path: faFaker.image.avatar()
        }
      }
    ],
    gender: Math.random() > 0.5 ? Genderypes.MAN : Genderypes.WOMAN,
    isVerified: Math.random() > 0.2,
    email,
    password
  }
}

export function addDemoUsers(ctxt: DataContext, count = 100): DataContext {
  for (let i = 0; i < count; i++) ctxt.users.push(makeDemoUser())
  return ctxt
}

export function addDemoPrices(ctxt: DataContext, count = 100): DataContext {
  let value = 6629000
  let date = +Date.now() - 60000 * count
  for (let i = 0; i < count; i++) {
    const mj = moment(date).add(3.5, 'h')
    ctxt.goldPrices.push({
      ...commons(),
      __typename: goldPricePath,
      createdAt: date,
      v: value,
      jDate: {
        y: mj.jYear().toString(),
        m: mj.jMonth().toString(),
        w: mj.jWeek().toString(),
        d: mj.jDate().toString(),
        hh: mj.hour().toString(),
        mm: mj.minute().toString()
      }
    })
    value += ~~((Math.random() - 0.45) * 100000)
    date += 3600000
  }
  return ctxt
}

export function addDemoCategories(ctxt: DataContext): DataContext {
  ctxt.categories.push(
    {
      ...commons(),
      __typename: categoryPath,
      title: 'طلای ۱۸ عیار'
    },
    {
      ...commons(),
      __typename: categoryPath,
      title: 'طلای ۲۴ عیار'
    },
    {
      ...commons(),
      __typename: categoryPath,
      title: 'طلای آب شده'
    }
  )
  return ctxt
}
