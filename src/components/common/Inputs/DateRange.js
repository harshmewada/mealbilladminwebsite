import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import InputContainer from "./InputContainer";
import { useController, useForm } from "react-hook-form";
import { DATEFORMAT } from "../../../contants";
const dateRanges = {
  Today: [moment().toDate(), moment().toDate()],
  Yesterday: [
    moment().subtract(1, "days").toDate(),
    moment().subtract(1, "days").toDate(),
  ],
  "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
  "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
  "This Month": [
    moment().startOf("month").toDate(),
    moment().endOf("month").toDate(),
  ],
  "Last Month": [
    moment().subtract(1, "month").startOf("month").toDate(),
    moment().subtract(1, "month").endOf("month").toDate(),
  ],
};
const DateRange = (props) => {
  const {
    label,
    name,
    placeholder,
    multiline,
    rows,
    error,
    size,
    options,
    onChange,
    value,
    noPadding,
  } = props;

  const { start, end } = value;
  const handleCallback = (start, end) => {
    // props.setValue({ start, end });
    onChange({ [name]: { start, end } });

    // setState({ start, end });
  };

  return (
    <InputContainer
      noPadding={noPadding}
      size={size}
      label={label}
      error={error}
    >
      <DateRangePicker
        initialSettings={{
          startDate: start.toDate(),
          endDate: end.toDate(),

          locale: {
            format: DATEFORMAT,
          },
          maxDate: new Date(),
          ...(!options?.hideRanges && {
            ranges: dateRanges,
          }),
          ...options,
        }}
        onCallback={handleCallback}
      >
        <input type="text" class="form-control" />
      </DateRangePicker>
    </InputContainer>
  );
};

export default DateRange;

// import React from "react";
// import DateRangePicker from "react-bootstrap-daterangepicker";
// import "bootstrap-daterangepicker/daterangepicker.css";
// import moment from "moment";
// import InputContainer from "./InputContainer";
// import { useController, useForm } from "react-hook-form";
// import { DATEFORMAT } from "../../../contants";
// const dateRanges = {
//   Today: [moment().toDate(), moment().toDate()],
//   Yesterday: [
//     moment().subtract(1, "days").toDate(),
//     moment().subtract(1, "days").toDate(),
//   ],
//   "Last 7 Days": [moment().subtract(6, "days").toDate(), moment().toDate()],
//   "Last 30 Days": [moment().subtract(29, "days").toDate(), moment().toDate()],
//   "This Month": [
//     moment().startOf("month").toDate(),
//     moment().endOf("month").toDate(),
//   ],
//   "Last Month": [
//     moment().subtract(1, "month").startOf("month").toDate(),
//     moment().subtract(1, "month").endOf("month").toDate(),
//   ],
// };
// const DateRange = (props) => {
//   const {
//     label,
//     name,
//     placeholder,
//     multiline,
//     rows,
//     error,
//     size,
//     options,
//     onChange,
//     value,
//   } = props;

//   const { start, end } = value;
//   const handleCallback = (start, end) => {
//     // props.setValue({ start, end });
//     onChange({ [name]: { start, end } });

//     // setState({ start, end });
//   };

//   return (
//     <div class={`form-group mb-0 col-md-${size || "6"}`}>
//       {label && <label>{label}</label>}
//       <DateRangePicker
//         initialSettings={{
//           startDate: start.toDate(),
//           endDate: end.toDate(),

//           locale: {
//             format: DATEFORMAT,
//           },
//           maxDate: new Date(),
//           ...(!options?.hideRanges && {
//             ranges: dateRanges,
//           }),
//           ...options,
//         }}
//         onCallback={handleCallback}
//       >
//         <input type="text" class="form-control" />
//       </DateRangePicker>

//       {error && (
//         <div className="text-danger mt-1">
//           <small>{error}</small>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DateRange;
