import React from "react";
import TodaysReservationModal from "../../../components/common/Modals/TodaysReservationModal";
const TableStatusInfo = () => {
  const [open, setOpen] = React.useState();

  return (
    <>
      <TodaysReservationModal open={open} onClose={() => setOpen(false)} />
      <div class="instruction">
        <div class="inst-card">
          <div class="box available"></div>
          <span>Available</span>
        </div>
        <div class="inst-card">
          <div class="box busy"></div>
          <span>Busy</span>
        </div>
        <div class="inst-card">
          <button
            className="btn btn-danger btn-sm shadow-none"
            onClick={() => setOpen(true)}
          >
            Reservations
          </button>

          {/* <div class="box reserved"></div>
        <span>Res.</span> */}
        </div>
      </div>
    </>
  );
};

export default TableStatusInfo;
