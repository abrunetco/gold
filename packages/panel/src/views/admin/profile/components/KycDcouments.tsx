import React from "react";
import image1 from "assets/img/profile/image1.png";
import Card from "components/card";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Badge } from "flowbite-react";

const DateFormatter = Intl.DateTimeFormat("fa-IR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const KycDcouments = () => {
  return (
    <Card extra={"w-full p-5 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          مدارک ارسال شه
        </h4>
        <p className="mt-2 text-base text-gray-600">
          مدارک مورد نیاز برای احراز هویت شما
        </p>
      </div>
      {/* Project 1 */}
      <div className="flex w-full justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow dark:!bg-navy-700 dark:shadow-none">
        <div className="flex items-center">
          <div className="">
            <img
              className="h-[80px] w-[120px] rounded-lg"
              src={image1}
              alt=""
            />
          </div>
          <div className="ms-4">
            <p className="text-base font-medium text-navy-700 dark:text-white">
              کارت ملی
            </p>
            <div className="mt-2 flex gap-3">
              <p className="text-sm text-gray-600">
                ارسال شده در {DateFormatter.format(new Date())}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 text-gray-600 dark:text-white">
          <Badge color="warning">بررسی نشده</Badge>
          <Badge color="success">تایید شده</Badge>
          <Badge color="failure">تایید نشده</Badge>
          {/* <MdModeEditOutline /> */}
        </div>
      </div>
    </Card>
  );
};

export default KycDcouments;
