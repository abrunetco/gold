// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import type { Static } from '@feathersjs/typebox'
import { Type, getValidator } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { Common, commonSchema } from '../../shared/common'
import { querySyntax } from '../../shared/query'
import { RelationSchema } from '../../shared/relation'
import { dataValidator, queryValidator } from '../../validators'
import { mediaPath } from '../medias/shared'
import type { CategoryService } from './class'
import { categoryPath } from './shared'

// Main data model schema
export const categorySchema = Type.Composite(
  [
    Type.Object({
      _typename: Type.Literal(categoryPath),
      title: Type.Optional(Type.String()),
      body: Type.Optional(Type.String()),
      image: Type.Optional(RelationSchema(mediaPath)),
      cover: Type.Optional(RelationSchema(mediaPath))
    }),
    commonSchema
  ],
  { $id: 'Category', additionalProperties: false }
)
export type Category = Static<typeof categorySchema>
export const mediaFieldsInCategorySchema: Array<Exclude<keyof Category, keyof Common>> = ['image', 'cover']
export const categoryValidator = getValidator(categorySchema, dataValidator)
export const categoryResolver = resolve<Category, HookContext<CategoryService>>({
  _typename: virtual(async () => categoryPath),
  stringified: virtual(async (u) => u.title)
})

export const categoryExternalResolver = resolve<Category, HookContext<CategoryService>>({
  // The password should never be visible externally
})

// Schema for creating new entries
export const categoryDataSchema = Type.Pick(categorySchema, ['title', 'body', 'image'], {
  $id: 'CategoryData'
})
export type CategoryData = Static<typeof categoryDataSchema>
export const categoryDataValidator = getValidator(categoryDataSchema, dataValidator)
export const categoryDataResolver = resolve<Category, HookContext<CategoryService>>({
  // needPwdOnVerify: virtual(async (category, ctx) => category.password ? true : undefined),
})

// Schema for updating existing entries
export const categoryPatchSchema = Type.Partial(categorySchema, {
  $id: 'CategoryPatch'
})
export type CategoryPatch = Static<typeof categoryPatchSchema>
export const categoryPatchValidator = getValidator(categoryPatchSchema, dataValidator)
export const categoryPatchResolver = resolve<Category, HookContext<CategoryService>>({})

// Schema for allowed query properties
export const categoryQueryProperties = Type.Pick(categorySchema, ['uid', 'title', 'body'])
export const categoryQuerySchema = Type.Composite(
  [
    querySyntax(categoryQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)

export type CategoryQuery = Static<typeof categoryQuerySchema>
export const categoryQueryValidator = getValidator(categoryQuerySchema, queryValidator)
export const categoryQueryResolver = resolve<CategoryQuery, HookContext<CategoryService>>({
  // If there is a category (e.g. with authentication), they are only allowed to see their own data
  // _id: async (value, category, context) => {
  //   if (context.params.category) {
  //     return context.params.category._id;
  //   }
  //   return value;
  // },
})
