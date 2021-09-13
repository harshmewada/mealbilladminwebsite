import React from "react";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/sass/styles";
const localizer = momentLocalizer(moment);

const ScheduleCalendar = ({ events: propsEvents, handleSelect }) => {
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
    />
  );
};

export default ScheduleCalendar;
