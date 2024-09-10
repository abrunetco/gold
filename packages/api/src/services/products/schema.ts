// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from "@feathersjs/schema";
import { Type, getValidator } from "@feathersjs/typebox";
import type { Static } from "@feathersjs/typebox";
import { passwordHash } from "@feathersjs/authentication-local";

import type { HookContext } from "../../declarations";
import { dataValidator, queryValidator } from "../../validators";
import type { ProductService } from "./class";
import { commonSchema } from "../../shared/common";
import { productPath } from "./shared";
import { gendertypeSchema } from "../../shared/fragments/gender-types";
import { AnyMediaSchema } from "../../shared/fragments/media";
import { querySyntax } from "../../shared/query";

// Main data model schema
export const productSchema = Type.Composite([
    Type.Object({
      __typename: Type.Literal(productPath),
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
  { $id: "Product", additionalProperties: false },
);
export type Product = Static<typeof productSchema>;
export const productValidator = getValidator(productSchema, dataValidator);
export const productResolver = resolve<Product, HookContext<ProductService>>({
  __typename: virtual(async () => productPath),
  stringified: virtual(async (u) => (u.firstName || u.lastName) ? `${u.firstName} ${u.lastName}`.trim() : (u.email ?? u.uid)),
});

export const productExternalResolver = resolve<Product, HookContext<ProductService>>({
  // The password should never be visible externally
  password: async () => undefined,
});

// Schema for creating new entries
export const productDataSchema = Type.Pick(
  productSchema,
  ["email", "password", "googleId"],
  {
    $id: "ProductData",
  },
);
export type ProductData = Static<typeof productDataSchema>;
export const productDataValidator = getValidator(productDataSchema, dataValidator);
export const productDataResolver = resolve<Product, HookContext<ProductService>>({
  password: passwordHash({ strategy: "local" }),
  // needPwdOnVerify: virtual(async (product, ctx) => product.password ? true : undefined),
});

// Schema for updating existing entries
export const productPatchSchema = Type.Partial(productSchema, {
  $id: "ProductPatch",
});
export type ProductPatch = Static<typeof productPatchSchema>;
export const productPatchValidator = getValidator(productPatchSchema, dataValidator);
export const productPatchResolver = resolve<Product, HookContext<ProductService>>({
  password: passwordHash({ strategy: "local" }),
});

// Schema for allowed query properties
export const productQueryProperties = Type.Pick(productSchema, [
  "uid",
  "email",
  "googleId",
]);
export const productQuerySchema = Type.Composite(
  [
    querySyntax(productQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false }),
  ],
  { additionalProperties: false },
);

export type ProductQuery = Static<typeof productQuerySchema>;
export const productQueryValidator = getValidator(productQuerySchema, queryValidator);
export const productQueryResolver = resolve<ProductQuery, HookContext<ProductService>>({
  // If there is a product (e.g. with authentication), they are only allowed to see their own data
  // _id: async (value, product, context) => {
  //   if (context.params.product) {
  //     return context.params.product._id;
  //   }

  //   return value;
  // },
});
