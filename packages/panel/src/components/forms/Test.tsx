import { Button } from "components/button";
import GenericField from "components/form/InputField";
import SmartForm, { SmartFormWatch } from "components/form/SmartForm";
import { ComponentProps, useState } from "react";
import { MdOutlinePercent } from "react-icons/md";

interface Schema {
  name: string;
  email: string;
  address: string;
  age: number;
  date: Date;
  gender: "man" | "woman";
  options: "op1" | "op2" | "op3";
  aggrement: string;
}

const date = new Date();
date.setFullYear(2025);
date.setMonth(0);
date.setDate(1);

export default function TestForm(
  props: ComponentProps<typeof SmartForm<Schema>>,
) {
  const [data, setData] = useState<Partial<Schema>>({
    name: "asdasd",
    email: "asdasd@asads.com",
    age: 18,
    address: "asdasd",
    date,
  });

  const onSubmit = (d: Schema) => {
    console.log("onSubmit TestForm", d);
    setData(d);
  };

  return (
    <div className="grid h-full w-full grid-cols-2 gap-5 p-5">
      <div>
        <SmartForm onSubmit={onSubmit} defaultValues={data} {...props}>
          <SmartFormWatch />
          <GenericField
            inline
            name="name"
            label="نام"
            about="توضیحات"
            rules={{
              required: { value: true, message: "ضروری است" },
              minLength: { value: 3, message: "کوتاه است" },
            }}
          />
          <GenericField
            name="email"
            label="آدرس ایمیل"
            type="email"
            about="توضیحات"
            rules={{ required: { value: true, message: "ضروری است" } }}
          />
          <GenericField
            name="address"
            label="آدرس"
            type="textarea"
            about="توضیحات"
            rules={{ required: { value: true, message: "ضروری است" } }}
          />
          <GenericField
            name="age"
            label="سن"
            type="number"
            rules={{}}
            icon={MdOutlinePercent}
          />
          <GenericField
            name="date"
            label="تاریخ تولد"
            type="date"
            rules={{ required: true }}
          />
          <GenericField
            name="gender"
            label="جنسیت"
            type="select"
            options={genderOptions}
          />
          <GenericField
            name="options"
            label="گزینه ها"
            type="btngroup"
            options={opOptions}
          />
          <GenericField name="aggrement" label="aggrement" type="checkbox" />
          <GenericField name="aggrement2" label="aggrement2" type="switch" />
          <div className="mt-5 grid h-full w-full grid-cols-2 gap-5">
            <Button type="submit">submit</Button>
            <Button color="blue" type="reset">
              rest
            </Button>
          </div>
        </SmartForm>
      </div>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

const genderOptions = {
  man: "مرد",
  woman: "زن",
};

const opOptions = {
  op1: "گزینه ۱",
  op2: "گزینه ۲",
  op3: "گزینه ۳",
};
