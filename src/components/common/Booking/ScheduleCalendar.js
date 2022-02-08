import React from "react";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { BOOKINGSTATUS } from "../../../contants";
// import "react-big-calendar/lib/sass/styles";
const localizer = momentLocalizer(moment);

const getEventstatusColor = (event) => {
  const foundIndex = BOOKINGSTATUS.find((e) => e.key === event.bookingStatus);

  return foundIndex.bgColor;
};
const ScheduleCalendar = ({
  events: propsEvents,
  handleSelect,
  onRangeChange,
}) => {
  return (
    <Calendar
      // selectable
      localizer={localizer}
      events={propsEvents}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date()}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 410 }}
      defaultView={Views.DAY}
      onSelectEvent={(event) => handleSelect(event)}
      onSelectSlot={handleSelect}
      onRangeChange={(e) => onRangeChange(e)}
      eventPropGetter={(event, start, end, isSelected) => {
        let newStyle = {
          backgroundColor: getEventstatusColor(event),
        };

        return {
          style: newStyle,
        };
      }}
    />
  );
};

export default ScheduleCalendar;
