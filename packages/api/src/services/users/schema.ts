// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'
import { passwordHash } from '@feathersjs/authentication-local'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { UserService } from './class'
import { Common, commonSchema } from '../../shared/common'
import { authManagementSchema } from './auth.schema'
import { userPath } from './shared'
import { gendertypeSchema } from '../../shared/fragments/gender-types'
import { querySyntax } from '../../shared/query'
import { roletypeSchema } from '../../shared/fragments/role-types'
import { RelationSchema } from '../../shared/relation'
import { mediaPath } from '../medias/shared'

// Main data model schema
export const userSchema = Type.Composite(
  [
    Type.Object({
      _typename: Type.Literal(userPath),
      firstName: Type.Optional(Type.String({ title: 'نام' })),
      lastName: Type.Optional(Type.String({ title: 'نام خانوادگی' })),
      avatar: Type.Optional(RelationSchema(mediaPath)),
      cover: Type.Optional(RelationSchema(mediaPath)),
      gender: Type.Optional(gendertypeSchema),
      email: Type.String(),
      role: roletypeSchema,
      password: Type.Optional(Type.String()),
      googleId: Type.Optional(Type.String())
    }),
    commonSchema,
    authManagementSchema
  ],
  { $id: 'User', additionalProperties: false }
)

export type User = Static<typeof userSchema>
export const mediaFieldsInUserSchema: Array<Exclude<keyof User, keyof Common>> = ['avatar', 'cover']

export const userValidator = getValidator(userSchema, dataValidator)
export const userResolver = resolve<User, HookContext<UserService>>({
  _typename: virtual(async () => userPath),
  stringified: virtual(async (u) =>
    u.firstName || u.lastName ? `${u.firstName} ${u.lastName}`.trim() : (u.email ?? u.uid)
  )
})

export const userExternalResolver = resolve<User, HookContext<UserService>>({
  // The password should never be visible externally
  password: async () => undefined
})

// Schema for creating new entries
export const userDataSchema = Type.Pick(userSchema, ['email', 'password', 'googleId'], {
  $id: 'UserData'
})
export type UserData = Static<typeof userDataSchema>
export const userDataValidator = getValidator(userDataSchema, dataValidator)
export const userDataResolver = resolve<User, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' })
  // needPwdOnVerify: virtual(async (user, ctx) => user.password ? true : undefined),
})

// Schema for updating existing entries
export const userPatchSchema = Type.Partial(userSchema, {
  $id: 'UserPatch'
})
export type UserPatch = Static<typeof userPatchSchema>
export const userPatchValidator = getValidator(userPatchSchema, dataValidator)
export const userPatchResolver = resolve<User, HookContext<UserService>>({
  password: passwordHash({ strategy: 'local' })
})

// Schema for allowed query properties
export const userQueryProperties = Type.Pick(userSchema, [
  'uid',
  'firstName',
  'lastName',
  'role',
  'isVerified',
  'gender',
  'email',
  'googleId'
])
export const userQuerySchema = Type.Composite(
  [
    querySyntax(userQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export type UserQuery = Static<typeof userQuerySchema>
export const userQueryValidator = getValidator(userQuerySchema, queryValidator)
export const userQueryResolver = resolve<UserQuery, HookContext<UserService>>({
  // If there is a user (e.g. with authentication), they are only allowed to see their own data
  // _id: async (value, user, context) => {
  //   if (context.params.user) {
  //     return context.params.user._id;
  //   }
  //   return value;
  // },
})
