import { Button } from "components/button";
import GenericField from "components/form/InputField";
import SmartForm from "components/form/SmartForm";
import { ComponentProps } from "react";

export interface SignInSchema {
  strategy: "local";
  email: string;
  password: string;
}

export default function SignInForm(
  props: ComponentProps<typeof SmartForm<SignInSchema>>,
) {
  const onSubmit = (d: SignInSchema) => {
    console.log("onSubmit SignInForm", d);
  };

  return (
    <SmartForm<SignInSchema>
      className="ffffffffffffffffffffffffffffffffff"
      onSubmit={onSubmit}
      defaultValues={{
        strategy: "local",
      }}
      {...props}
    >
      <GenericField
        name="email"
        label="ایمیل"
        type="email"
        about="آدرس پست الکترونیکی که با آن ثبت نام کرده اید"
        rules={{ required: true }}
      />
      <GenericField
        name="password"
        label="رمز علور"
        type="password"
        about="شامل حروف و اعداد"
        rules={{ required: true }}
      />
      <Button className="mt-5 w-full" type="submit">
        ورود
      </Button>
    </SmartForm>
  );
}
