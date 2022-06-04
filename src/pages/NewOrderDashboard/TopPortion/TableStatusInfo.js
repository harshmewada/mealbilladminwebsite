import React from "react";
import TodaysReservationModal from "../../../components/common/Modals/TodaysReservationModal";
import PermissionsGate from "../../../components/PermissionGate";
import { SCOPES } from "../../../contants";
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

        <PermissionsGate scopes={[SCOPES.BOOKING_SYSTEM]}>
          <div class="inst-card">
            <button
              className="btn btn-danger btn-sm shadow-none"
              onClick={() => setOpen(true)}
            >
              Booking
            </button>

            {/* <div class="box reserved"></div>
        <span>Res.</span> */}
          </div>
        </PermissionsGate>
      </div>
    </>
  );
};

export default TableStatusInfo;
