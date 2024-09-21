// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { commonSchema } from '../../shared/common'
import { querySyntax } from '../../shared/query'
import { RelationSchema } from '../../shared/relation'
import { dataValidator, queryValidator } from '../../validators'
import { categorySchema } from '../categories'
import { categoryPath } from '../categories/shared'
import type { ProductService } from './class'
import { productPath } from './shared'

// Main data model schema
export const productSchema = Type.Composite(
  [
    Type.Object({
      _typename: Type.Literal(productPath),
      category: RelationSchema(categoryPath),
      _category: Type.Readonly(Type.Pick(categorySchema, ['title'], { $id: 'ProductCategory' })),
      title: Type.String(),
      description: Type.String(),
      content: Type.String()
    }),
    commonSchema
  ],
  { $id: 'Product', additionalProperties: false }
)
export type Product = Static<typeof productSchema>
export const productValidator = getValidator(productSchema, dataValidator)
export const productResolver = resolve<Product, HookContext<ProductService>>({
  _typename: virtual(async () => productPath),
  stringified: virtual(async (u) => u.title)
})

export const productExternalResolver = resolve<Product, HookContext<ProductService>>({
  // The password should never be visible externally
})

// Schema for creating new entries
export const productDataSchema = Type.Pick(productSchema, ['title', 'category', 'description', 'content'], {
  $id: 'ProductData'
})
export type ProductData = Static<typeof productDataSchema>
export const productDataValidator = getValidator(productDataSchema, dataValidator)
export const productDataResolver = resolve<Product, HookContext<ProductService>>({})

// Schema for updating existing entries
export const productPatchSchema = Type.Partial(productSchema, {
  $id: 'ProductPatch'
})
export type ProductPatch = Static<typeof productPatchSchema>
export const productPatchValidator = getValidator(productPatchSchema, dataValidator)
export const productPatchResolver = resolve<Product, HookContext<ProductService>>({})

// Schema for allowed query properties
export const productQueryProperties = Type.Pick(productSchema, ['uid', 'title', 'category'])
export const productQuerySchema = Type.Composite(
  [
    querySyntax(productQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export type ProductQuery = Static<typeof productQuerySchema>
export const productQueryValidator = getValidator(productQuerySchema, queryValidator)
export const productQueryResolver = resolve<ProductQuery, HookContext<ProductService>>({
  // If there is a product (e.g. with authentication), they are only allowed to see their own data
  // _id: async (value, product, context) => {
  //   if (context.params.product) {
  //     return context.params.product._id;
  //   }
  //   return value;
  // },
})
