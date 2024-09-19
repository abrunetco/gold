import Card from "components/card";
import KycCircleCheck from "./KycCircleCheck";
import { BsCheckSquare, BsExclamationSquare } from "react-icons/bs";

const KycCard = () => {
  return (
    <Card className="w-full h-full p-4">
      <div className="mb-auto flex flex-col items-center justify-center">
        <div className="mt-2 flex items-center justify-center rounded-full bg-lightPrimary p-[26px] text-5xl font-bold text-brand-500 dark:!bg-navy-700 dark:text-white">
          <KycCircleCheck progress={100} accepted />
        </div>
        <h4 className="my-3 text-2xl font-bold text-navy-700 dark:text-white">
          احراز هویت
        </h4>
      </div>
      <ul className="flex flex-col gap-2 ps-4">
        <li className="flex items-center gap-2 text-green-700 dark:text-green-400">
          <BsCheckSquare />
          <span>تکمیل مشخصات</span>
        </li>
        <li className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
          <BsExclamationSquare />
          <span>تصویر پروفایل</span>
        </li>
        <li className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
          <BsExclamationSquare />
          <span>اطلاعات تماس</span>
        </li>
        <li className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
          <BsExclamationSquare />
          <span>تایید مدیر</span>
        </li>
      </ul>
    </Card>
  );
};

export default KycCard;
