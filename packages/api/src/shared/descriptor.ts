import { Static, TSchema } from '@feathersjs/typebox'

export interface Descriptor<
  ISchemaType extends TSchema,
  IDataSchemaType extends TSchema,
  IQuerySchemaType extends TSchema,
  IPatchSchemaType extends TSchema
> {
  S: Static<ISchemaType>
  D: Static<IDataSchemaType>
  Q: Static<IQuerySchemaType>
  P: Static<IPatchSchemaType>
}
