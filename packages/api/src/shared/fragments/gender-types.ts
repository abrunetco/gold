import { Type } from "@sinclair/typebox"

export enum Genderypes {
  WOMAN = 'WOMAN',
  MAN = 'MAN',
}

type GenderypesMarkup = { label: string }
type GenderypesMarkupMap = Record<Genderypes, GenderypesMarkup>

export const GENDERTYPE_MAP: GenderypesMarkupMap = {
  MAN: { label: 'مذکر' },
  WOMAN: { label: 'مونث' },
} as const

export const gendertypeSchema = Type.Unsafe<Genderypes>({
  type: "string",
  enum: Object.keys(GENDERTYPE_MAP),
  enumNames: Object.values(GENDERTYPE_MAP).map(item => item.label),
  title: 'جنسیت'
})

export const extendedGenderypeSchema = Type.Unsafe<Genderypes | 'default'>({
  type: "string",
  enum: [...Object.keys(GENDERTYPE_MAP), 'default'],
  enumNames: [...Object.values(GENDERTYPE_MAP).map(item => item.label), 'همه'],
  title: 'جنسیت'
})