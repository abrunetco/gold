// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from "@feathersjs/schema";
import { Type, getValidator } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";
import { passwordHash } from "@feathersjs/authentication-local";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { InvoiceService } from "./class";
import { commonSchema } from "../../shared/common";
import { invoicePath } from "./shared";
import { gendertypeSchema } from "../../shared/fragments/gender-types";
import { AnyMediaSchema } from "../../shared/fragments/media";
import { querySyntax } from "../../shared/query";

// Main data model schema
export const invoiceSchema = Type.Composite([
    Type.Object({
      __typename: Type.Literal(invoicePath),
      firstName: Type.Optional(Type.String({ title: 'نام' })),
      lastName: Type.Optional(Type.String({ title: 'نام خانوادگی' })),
      avatar: Type.Optional(AnyMediaSchema('single', { title: "تصویر" })),
      gender: Type.Optional(gendertypeSchema),
      email: Type.String(),
      password: Type.Optional(Type.String()),
      googleId: Type.Optional(Type.String()),
    }),
    commonSchema,
  ],
  { $id: "Invoice", additionalProperties: false },
);
export type Invoice = Static<typeof invoiceSchema>;
export const invoiceValidator = getValidator(invoiceSchema, dataValidator);
export const invoiceResolver = resolve<Invoice, HookContext<InvoiceService>>({
  __typename: virtual(async () => invoicePath),
  stringified: virtual(async (u) => (u.firstName || u.lastName) ? `${u.firstName} ${u.lastName}`.trim() : (u.email ?? u.uid)),
});

export const invoiceExternalResolver = resolve<Invoice, HookContext<InvoiceService>>({
  // The password should never be visible externally
  password: async () => undefined,
});

// Schema for creating new entries
export const invoiceDataSchema = Type.Pick(
  invoiceSchema,
  ["email", "password", "googleId"],
  {
    $id: "InvoiceData",
  },
);
export type InvoiceData = Static<typeof invoiceDataSchema>;
export const invoiceDataValidator = getValidator(invoiceDataSchema, dataValidator);
export const invoiceDataResolver = resolve<Invoice, HookContext<InvoiceService>>({
  password: passwordHash({ strategy: "local" }),
  // needPwdOnVerify: virtual(async (invoice, ctx) => invoice.password ? true : undefined),
});

// Schema for updating existing entries
export const invoicePatchSchema = Type.Partial(invoiceSchema, {
  $id: "InvoicePatch",
});
export type InvoicePatch = Static<typeof invoicePatchSchema>;
export const invoicePatchValidator = getValidator(invoicePatchSchema, dataValidator);
export const invoicePatchResolver = resolve<Invoice, HookContext<InvoiceService>>({
  password: passwordHash({ strategy: "local" }),
});

// Schema for allowed query properties
export const invoiceQueryProperties = Type.Pick(invoiceSchema, [
  "uid",
  "email",
  "googleId",
]);
export const invoiceQuerySchema = Type.Composite(
  [
    querySyntax(invoiceQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);

export type InvoiceQuery = Static<typeof invoiceQuerySchema>;
export const invoiceQueryValidator = getValidator(invoiceQuerySchema, queryValidator);
export const invoiceQueryResolver = resolve<InvoiceQuery, HookContext<InvoiceService>>({
  // If there is a invoice (e.g. with authentication), they are only allowed to see their own data
  // _id: async (value, invoice, context) => {
  //   if (context.params.invoice) {
  //     return context.params.invoice._id;
  //   }

  //   return value;
  // },
});
