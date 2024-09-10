import { useId } from 'react';
import { ControllerFieldState, ControllerRenderProps, FieldPath, FieldValues, UseFormStateReturn } from 'react-hook-form';
import { tv, VariantProps } from 'tailwind-variants';
import { FieldError } from './FieldError';

const textInput = tv({
  slots: {
    label: 'text-sm text-navy-700 dark:text-white',
    input: 'mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none',
    meta: '',
  },
  variants: {
    variant: {
      auth: {
        label: "ms-1.5 font-medium"
      },
      form: {
        label: "ms-3 font-bold"
      },
    },
    disabled: {
      true: {
        input: '!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]'
      }
    },
    severity: {
      default: {},
      success: {},
      error: {}
    }
  },
  compoundVariants: [
    {
      disabled: false,
      severity: 'default',
      class: {
        input: "border-gray-200 dark:!border-white/10 dark:text-white"
      }
    },
    {
      disabled: false,
      severity: 'error',
      class: {
        input: "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
      }
    },
    {
      disabled: false,
      severity: 'success',
      class: {
        input: "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
      }
    },

  ],
  defaultVariants: {
    theme: "form",
    severity: "default",
    disabled: false,
    ltr: false
  }
});

type TextFieldVariantProps = VariantProps<typeof textInput>

interface IRenderProp<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<TFieldValues>;
}

interface TextFieldProps<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> {
  id?: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'textarea';
  className?: string;
  placeholder?: string;
  renderProps: IRenderProp<TFieldValues, TName>
  ltr? :true
}

export function TextField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>
  (props: TextFieldProps<TFieldValues, TName> & Pick<TextFieldVariantProps, 'variant'>) {
  const id2 = useId()
  const { label: labelText, id = id2, className, placeholder, variant, renderProps, type = 'text', ltr } = props;
  const { field, fieldState } = renderProps;
  const { invalid, isDirty, isTouched, isValidating, error } = fieldState;

  const severity = invalid ? 'error' : isDirty && isTouched ? "success" : "default"

  const cls = textInput({ variant, disabled: field.disabled, severity })

  return (
    <div className={className}>
      <label htmlFor={id} className={cls.label()}> {labelText} </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          className={cls.input()}
          dir={ltr ? 'ltr' : 'rtl'}
          {...field}
          value={field.value ?? ''}
        />
      ): (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={cls.input()}
          dir={ltr ? 'ltr' : 'rtl'}
          {...field}
          value={field.value ?? ''}
        />
      )}
      <FieldError {...error} />
    </div>
  );
}

