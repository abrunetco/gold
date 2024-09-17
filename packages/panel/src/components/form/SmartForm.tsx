import React, { PropsWithChildren, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  useForm,
  useFormContext,
  UseFormProps,
} from "react-hook-form";
import { FormVariantProps, formTV } from "./variants";

interface SmartFormProps<T extends FieldValues> extends UseFormProps<T, any> {
  className?: string;
  onSubmit?: (data: T) => unknown;
  remoteData?: T;
}

export default function SmartForm<T extends FieldValues>({
  className,
  children,
  onSubmit,
  remoteData,
  ...props
}: PropsWithChildren<SmartFormProps<T> & FormVariantProps>) {
  const methods = useForm<T, any>(props);
  const { setValue } = methods;
  const cls = formTV({ className });

  useEffect(() => {
    if (remoteData) {
      for (const [path, value] of Object.entries(remoteData)) {
        setValue(path as any, value, {
          shouldValidate: false,
          shouldDirty: false,
          shouldTouch: false,
        });
      }
    }
  }, [remoteData, setValue]);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className={cls}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  );
}

export function SmartFormWatch<T extends FieldValues>(): JSX.Element {
  const { watch } = useFormContext<T>();
  const root = watch();
  useEffect(() => {
    console.log(root);
  }, [root]);
  return null;
}
