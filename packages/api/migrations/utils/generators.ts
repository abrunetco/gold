import { faker } from '@faker-js/faker'
import { faker as faFaker } from '@faker-js/faker/locale/fa'
import { categoryPath, goldPricePath, User } from '../../src/client'
import { Genderypes } from '../../src/shared/fragments/gender-types'
import { Mediatypes } from '../../src/shared/fragments/media'
import { commons, userCommons, DataContext } from './collections'
import { userPath } from '../../src/services/users/shared'
import moment from 'moment-jalaali'
import { RoleTypes } from '../../src/shared/fragments/role-types'
import { uid } from 'uid'
import { balancePath } from '../../lib/client'

function makeDemoUser(): User {
  const email = faker.internet.email({ provider: 'test.gold.me' }),
    password = '$2a$10$q4UfToeeFyIZlAu7SrTr0OomYQc0qv60YUVG1TDi5ch2Eov1bNm2m' // === await bcrypt.hash("123456", 10)

  return {
    ...commons(),
    ...userCommons,
    __typename: userPath,
    firstName: faFaker.person.firstName(),
    lastName: faFaker.person.lastName(),
    role: RoleTypes.CUSTOMER,
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
        m: (mj.jMonth() + 1).toString(),
        w: mj.jWeek().toString(),
        d: mj.jDate().toString(),
        hh: mj.hour().toString(),
        mm: mj.minute().toString()
      }
    })
    value += ~~((Math.random() - 0.5 + Math.sin(mj.jDate()) / 10 + Math.sin(mj.weekday()) / 10) * 10000)
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

function shuffle<T>(array: Array<T>) {
  let currentIndex = array.length

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--

    // And swap it with the current element.
    ;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
  }
}

export function addDemoBalances(ctxt: DataContext, count = 100): DataContext {
  shuffle(ctxt.users)
  const users = ctxt.users.slice(0, 10)

  for (let i = 1; i <= count; i++) {
    const useIndex = i % users.length,
      user = users[useIndex],
      value = (Math.random() - 0.5) * (Math.random() + 0.3) * 10000
    ctxt.balances.push({
      ...commons(),
      __typename: balancePath,
      user: user.uid,
      number: i,
      value: Math.round(value) * 1000,
      userLabel: '',
      src: {
        invoice: uid(16)
      }
    })
  }

  return ctxt
}
