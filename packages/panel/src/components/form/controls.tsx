import { Button } from "components/button";
import { submitBtnTV, SubmitBtnVariantProps } from "./variants";
import { ComponentProps, FC, PropsWithChildren } from "react";
import { useFormContext } from "react-hook-form";
import { FaSpinner, FaSave, FaUnlock, FaUpload } from "react-icons/fa";

interface SubmitBtnProps
  extends SubmitBtnVariantProps,
    Omit<ComponentProps<typeof Button>, "type"> {
  icon?: FC<ComponentProps<"svg">>;
}

export function SubmitBtn(props: PropsWithChildren<SubmitBtnProps>) {
  const { className, type, icon, children, ...rest } = props;
  const cls = submitBtnTV({ type, className });
  const {
    formState: { isDirty, isValid, isLoading, isSubmitting, isValidating },
  } = useFormContext();
  const showSpin = isLoading || isSubmitting || isValidating;
  const canSubmit = !showSpin && isValid && isDirty;
  const Icon = icon ?? icons[type] ?? icons.send;

  return (
    <Button {...rest} type="submit" className={cls} disabled={!canSubmit}>
      <div className="flex items-center gap-3">
        {showSpin ? <FaSpinner className="animate-spin" /> : <Icon />}
        {children ?? <span>{labels[type] ?? labels.send}</span>}
      </div>
    </Button>
  );
}

const labels = {
  send: `ارسال`,
  save: `ذخیره`,
  login: `ورود`,
} as const;

const icons = {
  send: FaUpload,
  save: FaSave,
  login: FaUnlock,
} as const;
