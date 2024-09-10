import { Type } from "@sinclair/typebox";

export const natIdSchema = Type.String({
  maxLength: 10,
  minLength: 10,
  // pattern: '^[0-9]{2}[1-9][0-9]{6}[1-9]$',
  title: 'کد ملی'
})

export type LinkNonation = `http://${string}` | `https://${string}`

export const linkSchema = Type.Unsafe<LinkNonation>({
  type: "string",
  format: "url"
})
export const neverObjectSchema = Type.Object({}, { additionalProperties: false })