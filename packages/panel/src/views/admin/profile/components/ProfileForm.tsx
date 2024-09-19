import Card from "components/card";
import SmartForm from "components/form/SmartForm";
import { useAuth } from "providers/auth";
import SmartMutateProvider from "providers/mutate";
import GenericField from "components/form/InputField";
import { UserPatch } from "@gold/api";
import { SubmitBtn } from "components/form/controls";
const ProfileForm = () => {
  const auth = useAuth();
  return (
    <Card extra={"w-full h-full px-5 py-8"}>
      {/* Header */}
      <div className="mb-8 mt-2 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          مشخصات
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          اطلاعات هویتی خود را به درستی وارد کنید. مشخصات شخصی شما پس ا پیرایش
          توسط مدیر سیستم بررسی خواهد شد
        </p>
      </div>
      {/* Cards */}
      <SmartMutateProvider service="users" uid={auth.user.uid}>
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
    </Card>
  );
};

export default ProfileForm;
