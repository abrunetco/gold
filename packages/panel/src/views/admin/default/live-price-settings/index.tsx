import Card from "components/card";
import { SelectFieldControl, TextFieldControl } from "components/fields";
import { useCallback } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineSettings } from "react-icons/md";

const modes = {
  fixed: "قیمت ثابت",
  channel: "کانال تلگرام",
  percent: "درصدی از کانال تلگرام",
} as const;

type FormData = {
  mode: keyof typeof modes;
  fixed: {
    value: number;
  };
  percent: {
    value: number;
  };
};

const modeOptions = Object.entries(modes);

export default function LivePriceSettings() {
  const defaultValues: FormData = {
    mode: "channel",
    fixed: { value: 36000000 },
    percent: { value: 1 },
  };
  const { handleSubmit, control, watch } = useForm<FormData>({
    defaultValues,
  });
  const onSubmit = useCallback(
    handleSubmit(async (data) => {
      console.log("save LivePriceSettings", data);
    }),
    [handleSubmit],
  );
  const mode = watch("mode");
  return (
    <Card extra="!p-[20px] texcenter h-[400px]">
      <div className="mb-auto flex items-center justify-between">
        <h2 className="text-lg font-bold text-navy-700 dark:text-white">
          تنظیمات قیمت - {mode}
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdOutlineSettings className="h-6 w-6" />
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-4 h-full w-full">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <Controller
              name="mode"
              control={control}
              rules={{ required: true }}
              render={(rp) => (
                <SelectFieldControl
                  className="mb-3"
                  size="lg"
                  renderProps={rp}
                  label="ایمیل"
                  options={modeOptions}
                />
              )}
            />
            {mode === "fixed" ? (
              <Controller
                name="fixed.value"
                control={control}
                rules={{ required: true }}
                render={(rp) => (
                  <TextFieldControl
                    type="number"
                    className="mb-3"
                    renderProps={rp}
                    label="قیمت ثابت"
                    placeholder="قیمت به ریال"
                    dir="ltr"
                  />
                )}
              />
            ) : null}
            <button className="mt-2 rounded-xl bg-brand-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200">
              ذخیره
            </button>
          </div>
          <div className="">
            <h3 className="text-md mt-3 font-bold text-navy-700 dark:text-white">
              {modes["fixed"]}
            </h3>
            <p>
              در این حال قیمت بر روی عدد مورد نظر شما ثابت می‌ماند و تغییر نمی
              کند
            </p>
            <h3 className="text-md mt-3 font-bold text-navy-700 dark:text-white">
              {modes["channel"]}
            </h3>
            <p>
              در این حالت قیمت های وبسایت از طریق کانال تلگرام بصورت خودکار به
              روز رسانی می‌شود
            </p>
            <h3 className="text-md mt-3 font-bold text-navy-700 dark:text-white">
              {modes["percent"]}
            </h3>
            <p>
              در این حالت قیمت ها قبل از ثبت در سیستم به ضریب تعریف شده ضرب
              می‌شود
            </p>
          </div>
        </div>
      </form>
    </Card>
  );
}
