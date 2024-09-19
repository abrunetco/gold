import { useState } from "react";
import Calendar from "react-calendar";
import Card from "components/card";
import "react-calendar/dist/Calendar.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import "assets/css/MiniCalendar.css";

const MiniCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Card className="flex w-full h-full flex-col px-3 py-3">
        <Calendar
          onChange={onChange}
          value={value}
          prevLabel={<MdChevronLeft className="ms-1 h-6 w-6" />}
          nextLabel={<MdChevronRight className="ms-1 h-6 w-6" />}
          view={"month"}
        />
      </Card>
    </div>
  );
};

export default MiniCalendar;
