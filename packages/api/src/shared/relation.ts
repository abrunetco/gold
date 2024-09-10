import { Type, StringOptions, StringFormatOption, NumericOptions } from "@sinclair/typebox"
// import { EntityNames } from "@sms/api/src/client";
// import { MARKUP_MAP } from "../markups";

export function MongoDateSchema(options?: NumericOptions<number>) {
  return Type.Integer({ ...options, "ui:widget": 'date-picker', format: "date" })
}

export function RelationSchema(
  service: string,
  options?: StringOptions<StringFormatOption>
) {
  return Type.String({
    ...options,
    // title: options?.title ?? MARKUP_MAP[contentMediaType].single,
    contentMediaType: service,
    "ui:widget": 'remote-select'
  })
}
