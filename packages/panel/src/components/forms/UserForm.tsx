import { UserPatch } from "@gold/api";
import { SubmitBtn } from "components/form/controls";
import GenericField from "components/form/InputField";
import SmartForm from "components/form/SmartForm";
import SmartMutateProvider from "providers/mutate";

export default function UserForm(props: { uid: string }) {
  return (
    <SmartMutateProvider service="users" uid={props.uid}>
      <SmartForm className="grid grid-cols-2 gap-x-3 gap-y-0 px-2">
        <GenericField<UserPatch> name="firstName" label="نام" />
        <GenericField<UserPatch> name="lastName" label="نام خانوادگی" />
        <GenericField<UserPatch>
          name="email"
          label="ایمیل"
          className="col-span-2"
        />
        <SubmitBtn type="save" />
      </SmartForm>
    </SmartMutateProvider>
  );
}
