import { Static, Type } from "@sinclair/typebox";

export const authManagementSchema = Type.Object(
  {
    needPwdOnVerify: Type.Optional(Type.Literal(true)), // sensitive data
    isVerified: Type.Boolean({ default: false, title: "شناسه تایید شده" }),
    verifyToken: Type.Optional(Type.Any()), // sensitive data
    verifyShortToken: Type.Any(), // sensitive data
    verifyExpires: Type.Any({ title: "انقضای تایید ایمیل" }),
    verifyChanges: Type.Record(Type.String(), Type.Any()), // sensitive data
    resetToken: Type.Any(), // sensitive data
    resetShortToken: Type.Any(), // sensitive data
    resetExpires: Type.Any({ title: "انقضای تغییر رمز" }),
    resetAttempts: Type.Any({ title: "تلاش برای تغییر رمز" }),
  },
  { $id: "AuthManagement", additionalProperties: false }
)

export type TAuthManagement = typeof authManagementSchema
export type AuthManagement = Static<TAuthManagement>

export const passwordChangeSchema = Type.Object({
  oldPassword: Type.String({ title: 'گذرواژه فعلی', "ui:widget": "password" }),
  password: Type.String({ title: 'گذرواژه جدید', "ui:widget": "password" }),
  password2: Type.String({ title: 'تکرار گذرواژه', "ui:widget": "password" }),
}, { $id: "PasswordChange", additionalProperties: false, title: "تغییر گذرواژه" })

export type TPasswordChange = typeof passwordChangeSchema
export type PasswordChange = Static<TPasswordChange>