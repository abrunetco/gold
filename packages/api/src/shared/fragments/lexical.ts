import { Static, Type } from '@sinclair/typebox'

type SerializedLexicalNode = {
  type: string
  version: number
}

type Spread<T1, T2> = Omit<T2, keyof T1> & T1

export type ElementFormatType = 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | ''

type SerializedElementNode<T extends SerializedLexicalNode = SerializedLexicalNode> = Spread<
  {
    children: Array<T>
    direction: 'ltr' | 'rtl' | null
    format: ElementFormatType
    indent: number
  },
  SerializedLexicalNode
>

type SerializedRootNode<T extends SerializedLexicalNode = SerializedLexicalNode> = SerializedElementNode<T>
export const lexicalStateSchema = Type.Object(
  {
    root: Type.Unsafe<SerializedRootNode>({ type: 'object' })
  },
  { title: 'متن', 'ui:widget': 'rich-text' }
)

export type TLexicalState = typeof lexicalStateSchema
export type LexicalState = Static<TLexicalState>
