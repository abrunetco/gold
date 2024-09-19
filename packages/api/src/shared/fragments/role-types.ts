import { Type } from '@sinclair/typebox'

export enum RoleTypes {
  ADMIN = 'ADMIN',
  USER = 'USER',
  CUSTOMER = 'CUSTOMER'
}

type RoleTypesMarkup = { label: string }
type RoleTypesMarkupMap = Record<RoleTypes, RoleTypesMarkup>

export const ROLETYPE_MAP: RoleTypesMarkupMap = {
  ADMIN: { label: 'مدیر' },
  USER: { label: 'کاربر' },
  CUSTOMER: { label: 'مشتری' }
} as const

export const roletypeSchema = Type.Unsafe<RoleTypes>({
  type: 'string',
  enum: Object.keys(ROLETYPE_MAP),
  enumNames: Object.values(ROLETYPE_MAP).map((item) => item.label),
  title: 'نقش'
})
