import { sortDefinition } from "@feathersjs/typebox";
import { Kind, TAny, TArray, TBoolean, TComposite, TExtends, TInteger, TObject, TPartial, TRecursive, TSchema, TString, TUnion, TUnsafe, Type } from "@sinclair/typebox";
import _ from "lodash";
import { TCommonQueryProperties, commonQueryProperties } from "./common";
import { textSearchQuerySchema } from "../resolvers/text.search";

const arrayOfKeys = <T extends TObject>(type: T) => {
  const keys = Object.keys(type.properties);
  return Type.Unsafe<(keyof T['properties'])[]>({
    type: 'array',
    maxItems: keys.length,
    items: {
      type: 'string',
      ...(keys.length > 0 ? { enum: keys } : {})
    }
  });
};
type TPropertySyntax<T extends TSchema> = TUnion<[
  T,
  TPartial<
    TObject<{
      $gt: T;
      $lt: T;
      $gte: T;
      $lte: T;
      $eq: T;
      $ne: T;
      $elemMatch: TAny;
      $regex: TString,
      $in: TArray<T>;
      $nin: TArray<T>;
      $exist: TBoolean;
    }>
  >
]>


function isTArray(s: TSchema): s is TArray { return s[Kind] === 'array' }

export function propertySyntax<T extends TSchema>(schema: T): TPropertySyntax<T> {
  return Type.Union([
    schema,
    Type.Partial(
      Type.Object({
        $gt: schema,
        $lt: schema,
        $gte: schema,
        $lte: schema,
        $eq: schema,
        $ne: schema,
        $elemMatch: Type.Any(),
        $regex: Type.String(),
        $in: Type.Array(schema),
        $nin: Type.Array(schema),
        $exist: Type.Boolean()
      })
    )
  ])
}
type TPropertiesSyntax<T extends TObject> = TPartial<
  TObject<{
    [K in keyof T['properties']]: TPropertySyntax<T['properties'][K]>;
  }>
>;

export function propertiesSyntax<T extends TObject>(schema: T): TPropertiesSyntax<T> {
  return Type.Partial(
    Type.Object(
      _.mapValues(schema.properties, v => propertySyntax(v))
    )
  ) as TPropertiesSyntax<T>;
}
export type TQuerySyntax<T extends TObject> = TPartial<
  TComposite<[
    TPropertiesSyntax<TCommonQueryProperties>,
    TPropertiesSyntax<T>,
    TObject<{
      $text: TObject<{ $search: TString; }>;
      $limit: TInteger;
      $skip: TInteger;
      $sort: TComposite<[
        TObject<{
          [K in keyof T['properties']]: TInteger;
        }>,
        TObject<{
          [K in keyof TCommonQueryProperties['properties']]: TInteger;
        }>
      ]>;
      $select: TArray<TUnsafe<keyof (T['properties'] & TCommonQueryProperties['properties'])>>;
      $and: TArray<
        TComposite<[
          TPropertiesSyntax<TCommonQueryProperties>,
          TPropertiesSyntax<T>
        ]>
      >;
      $or: TArray<
        TComposite<[
          TPropertiesSyntax<TCommonQueryProperties>,
          TPropertiesSyntax<T>
        ]>
      >;
    }>
  ]>
>;

export function querySyntax<T extends TObject>(schema: T): TQuerySyntax<T> {
  const properties = Type.Composite([schema, commonQueryProperties]);
  const fields = propertiesSyntax(properties);
  return Type.Partial(
    Type.Composite(
      [
        fields,
        textSearchQuerySchema,
        Type.Object({
          $limit: Type.Integer(),
          $skip: Type.Integer(),
          $select: arrayOfKeys(properties),
          $sort: sortDefinition(properties),
          $and: Type.Array(fields),
          $or: Type.Array(fields),
        }),
      ],
      { additionalProperties: false }
    )
  );
}
