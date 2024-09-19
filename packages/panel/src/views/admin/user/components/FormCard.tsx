import Card from "components/card";
import UserForm from "components/forms/UserForm";

const FormCard = ({ uid }: { uid: string }) => {
  return (
    <Card className="h-full w-full px-5 py-8">
      {/* Header */}
      <div className="mb-8 mt-2 w-full">
        <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">
          مشخصات
        </h4>
        <p className="mt-2 px-2 text-base text-gray-600">
          اطلاعات هویتی خود را به درستی وارد کنید. مشخصات شخصی شما پس از ویرایش
          توسط مدیر سیستم بررسی خواهد شد
        </p>
      </div>
      {/* Cards */}
      <UserForm uid={uid} />
    </Card>
  );
};

export default FormCard;
