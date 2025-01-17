import Card from "components/card";

import Dropdown from "components/dropdown";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { flexRender, Table } from "@tanstack/react-table";

interface ColumnsMenuProps<T> {
  table: Table<T>;
}

function ColumnsMenu<T>({ table }: ColumnsMenuProps<T>) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dropdown
      button={
        <button
          onClick={() => setOpen(!open)}
          className={`linear flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-xl font-bold text-brand-500 transition duration-200 hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10`}
        >
          <BsThreeDots className="h-6 w-6" />
        </button>
      }
      animation={"origin-top-end transition-all duration-300 ease-in-out"}
      classNames="top-11 end-0 w-max"
    >
      <Card className="p-4">
        {/* task header */}
        <h4 className="ms-4 text-xl font-bold text-navy-700 dark:text-white">
          ستون ها
        </h4>

        {/* task content */}

        <div className="h-full w-full">
          {table.getAllLeafColumns().map((column) => {
            return (
              <div
                key={column.id}
                className="mt-2 flex min-w-[150px] items-center justify-between p-2"
              >
                <label className="flex items-center justify-center gap-2">
                  {/* <Checkbox che /> */}
                  <input
                    {...{
                      type: "checkbox",
                      checked: column.getIsVisible(),
                      onChange: column.getToggleVisibilityHandler(),
                    }}
                  />
                  <p className="text-base font-bold text-navy-700 dark:text-white">
                    {flexRender(column.columnDef.header, {} as any)}
                  </p>
                </label>
                {/* <div>
                  <MdDragIndicator className="h-6 w-6 text-navy-700 dark:text-white" />
                </div> */}
              </div>
            );
          })}
        </div>
      </Card>
    </Dropdown>
  );
}

export default ColumnsMenu;
