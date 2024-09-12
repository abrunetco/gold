import { FieldValues, FieldPath, ControllerRenderProps, ControllerFieldState, UseFormStateReturn } from "react-hook-form";

type FieldVariantNames = 'auth' | 'form' | 'th' | 'td'
type FieldSeverityNames = 'success' | 'error' | 'default'
type FieldSizeNames = 'sm' | 'md' | 'lg'

export interface BaseFieldVariants {
  variant?: FieldVariantNames
  severity?: FieldSeverityNames
  size?: FieldSizeNames
}

export interface IRenderProp<T extends FieldValues = FieldValues, N extends FieldPath<T> = FieldPath<T>> {
  field: ControllerRenderProps<T, N>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<T>;
}
