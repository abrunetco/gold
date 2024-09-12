import { faker } from '@faker-js/faker';
import { faker as faFaker } from '@faker-js/faker/locale/fa';
import { User } from "../../src/client"
import { Genderypes } from "../../src/shared/fragments/gender-types"
import { Mediatypes } from "../../src/shared/fragments/media"
import { commons, userCommons, DataContext } from "./collections"
import { userPath } from '../../src/services/users/shared';

function makeDemoUser(): User {
  const email = faker.internet.email({ provider: 'test.gold.me'}),
    password = "$2a$10$q4UfToeeFyIZlAu7SrTr0OomYQc0qv60YUVG1TDi5ch2Eov1bNm2m" // === await bcrypt.hash("123456", 10)

  return {
    ...commons(),
    ...userCommons,
    __typename: userPath,
    firstName: faFaker.person.firstName(),
    lastName: faFaker.person.lastName(),
    avatar: [{
      id: 'external',
      type: Mediatypes.IMAGE,
      external: {
        path: faFaker.image.avatar()
      }
    }],
    gender: Math.random() > 0.5 ? Genderypes.MAN : Genderypes.WOMAN,
    isVerified: Math.random() > 0.2,
    email,
    password,
  }
}


export function addDemoUsers(ctxt: DataContext, count = 100): DataContext {
  for(let i = 0; i < count; i++) ctxt.users.push(makeDemoUser())
  return ctxt
}