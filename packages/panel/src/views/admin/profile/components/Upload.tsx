import { MdFileUpload } from "react-icons/md";
import Card from "components/card";

const Upload = () => {
  return (
    <Card extra="grid h-full w-full grid-cols-1 gap-3 p-3 2xl:grid-cols-11">
      <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
        <button className="flex h-full w-full flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
          <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
          <h4 className="text-xl font-bold text-brand-500 dark:text-white">
            ارسال مدارک
          </h4>
          <p className="mt-2 text-sm font-medium text-gray-600">
            فرمت های قابل قبول PNG و JPG.
          </p>
          <p className="mt-2 text-sm font-medium text-gray-600">
            حداکثر تا ۲ مگابایت.
          </p>
        </button>
      </div>

      <div className="col-span-5 flex h-full w-full flex-col overflow-hidden rounded-xl bg-white pb-4 ps-3 dark:!bg-navy-800">
        <h5 className="text-start text-xl font-bold leading-9 text-navy-700 dark:text-white">
          باکس ارسال مدارک
        </h5>
        <div className="my-auto"></div>
        <button className="linear mt-4 flex items-center justify-center rounded-xl bg-brand-500 px-2 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
          ارسال
        </button>
      </div>
    </Card>
  );
};

export default Upload;
