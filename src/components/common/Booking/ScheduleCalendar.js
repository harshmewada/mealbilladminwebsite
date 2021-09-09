import React from "react";

import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import "react-big-calendar/lib/sass/styles";
const localizer = momentLocalizer(moment);

const ScheduleCalendar = () => {
  const [events, setEvents] = React.useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title)
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
  };
  return (
    <Calendar
      //   selectable
      localizer={localizer}
      events={events}
      scrollToTime={new Date(1970, 1, 1, 6)}
      defaultDate={new Date(2015, 3, 12)}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      defaultView={Views.DAY}
      onSelectEvent={(event) => alert(event.title)}
      onSelectSlot={handleSelect}
    />
  );
};

export default ScheduleCalendar;
