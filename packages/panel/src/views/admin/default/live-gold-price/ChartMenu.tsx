import React from "react";
import Dropdown from "components/dropdown";
import { CandleTypes } from "./useQuery";
import { MdOutlineCalendarToday } from "react-icons/md";

interface CandleTypesMenuProps {
  value: CandleTypes;
  onChange?: (v: CandleTypes) => void;
}

const options: [CandleTypes, string][] = [
  ["m", "ماه"],
  ["d", "روز"],
  ["w", "هفته"],
  ["hh", "ساعت"],
  ["mm", "دقیقه"],
];

export function CandleTypesMenu(props: CandleTypesMenuProps) {
  const { value, onChange } = props;
  const [open, setOpen] = React.useState(false);
  const label = options.find((o) => o[0] === value)?.[1] ?? "";
  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:hover:opacity-90 dark:active:opacity-80"
        >
          <MdOutlineCalendarToday />
          <span className="text-sm font-medium text-gray-800">
            قیمت طلا ({label})
          </span>
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`top-11 end-0 w-max`}
      children={
        <div className="z-50 w-max rounded-xl bg-white px-4 py-3 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          {options.map(([v, l]) => (
            <p
              key={v}
              onClick={() => onChange?.(v)}
              className="hover:text-black flex cursor-pointer items-center gap-2 text-gray-600 hover:font-medium"
            >
              {l}
            </p>
          ))}
        </div>
      }
    />
  );
}
