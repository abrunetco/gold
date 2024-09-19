import { User } from "@gold/api";
import { SubmitBtn } from "components/form/controls";
import GenericField from "components/form/InputField";
import SmartForm from "components/form/SmartForm";
import { useAuth } from "providers/auth";
import { ComponentProps } from "react";

export default function UserForm(
  props: ComponentProps<typeof SmartForm<User>>,
) {
  const auth = useAuth();

  const onSubmit = (d: User) => {
    console.log("onSubmit ProfileForm", d);
  };

  return (
    <SmartForm onSubmit={onSubmit} defaultValues={auth.user} {...props}>
      <GenericField name="firstName" label="نام" rules={{ required: true }} />
      <GenericField
        name="lastName"
        label="نام خانوادگی"
        rules={{ required: true }}
      />
      <SubmitBtn type="save" />
    </SmartForm>
  );
}
