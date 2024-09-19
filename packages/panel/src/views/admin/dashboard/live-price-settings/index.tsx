import { Config } from "@gold/api";
import GenericField from "components/form/InputField";
import { ConfigForm } from "components/forms/Configs";
import { useFormContext } from "react-hook-form";

const modes = {
  fixed: "قیمت ثابت",
  channel: "کانال تلگرام",
  percent: "درصدی از قیمت کانال تلگرام",
} as const;

const modesDescriptions = {
  fixed:
    "در این حال قیمت بر روی عدد مورد نظر شما ثابت می‌ماند و تغییر نمی کندیمت ثابت",
  channel:
    "در این حالت قیمت های وبسایت از طریق کانال تلگرام بصورت خودکار به روز رسانی می‌شود",
  percent:
    "در این حالت قیمت ها قبل از ثبت در سیستم به ضریب تعریف شده ضرب می‌شود",
} as const;

type FormData = Config["goldPriceConfig"];

function GoldPriceConfigForm() {
  const { watch } = useFormContext<FormData>();
  const mode = watch("mode");
  return (
    <div className="flex flex-col gap-5">
      <div>
        <GenericField
          name="mode"
          label="حالت قیمت گذاری"
          type="select"
          options={modes}
          about={modesDescriptions[mode]}
          rules={{ required: true }}
        />
        {mode === "fixed" ? (
          <GenericField
            name="fixed.value"
            label="قیمت ثابت"
            addon="ریال"
            type="number"
            options={modes}
            rules={{ required: true }}
          />
        ) : null}
      </div>
    </div>
  );
}
export default function LivePriceSettings() {
  return (
    <ConfigForm name="goldPriceConfig" className="h-[400px] !p-[20px]">
      <GoldPriceConfigForm />
    </ConfigForm>
  );
}
