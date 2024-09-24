import { faker } from '@faker-js/faker'
import { faker as faFaker } from '@faker-js/faker/locale/fa'
import moment from 'moment-jalaali'
import { uid } from 'uid'
import { balancePath, categoryPath, goldPricePath, productPath, User } from '../../src/client'
import { userPath } from '../../src/services/users/shared'
import { Genderypes } from '../../src/shared/fragments/gender-types'
import { RoleTypes } from '../../src/shared/fragments/role-types'
import { commons, DataContext, userCommons } from './collections'

function makeDemoUser(): User {
  const email = faker.internet.email({ provider: 'test.gold.me' }),
    password = '$2a$10$q4UfToeeFyIZlAu7SrTr0OomYQc0qv60YUVG1TDi5ch2Eov1bNm2m' // === await bcrypt.hash("123456", 10)

  return {
    ...commons(),
    ...userCommons,
    _typename: userPath,
    firstName: faFaker.person.firstName(),
    lastName: faFaker.person.lastName(),
    role: Math.random() > 0.1 ? RoleTypes.CUSTOMER : RoleTypes.USER,
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
      _typename: goldPricePath,
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
      _typename: categoryPath,
      body: faFaker.lorem.paragraph(),
      title: 'طلای ۱۸ عیار'
    },
    {
      ...commons(),
      _typename: categoryPath,
      body: faFaker.lorem.paragraph(),
      title: 'طلای ۲۴ عیار'
    },
    {
      ...commons(),
      _typename: categoryPath,
      body: faFaker.lorem.paragraph(),
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
      _typename: balancePath,
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

export function addDemoProducts(ctxt: DataContext, count = 100): DataContext {
  for (let i = 1; i <= count; i++) {
    const catIndex = i % ctxt.categories.length,
      category = ctxt.categories[catIndex]

    ctxt.products.push({
      ...commons(),
      _typename: productPath,
      category: category.uid,
      _category: undefined as any,
      title: 'شمش طلای ' + faFaker.person.firstName(),
      description: faFaker.lorem.paragraph(),
      content: faFaker.lorem.paragraphs(3)
    })
  }

  return ctxt
}
