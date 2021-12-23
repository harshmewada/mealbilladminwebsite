import React from "react";
import ModalContainer from "../ModalContainer";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBookings,
  getBookingOtp,
  verifyBooking,
} from "../../../redux/action/bookingActions";
import { Alert, Table } from "react-bootstrap";
import { BOOKINGSTATUS } from "../../../contants";

const TodaysReservationModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const { branchId } = useSelector((state) => state.user);
  const { bookings } = useSelector((state) => state.common);

  const [otps, setOtps] = React.useState({});

  React.useEffect(() => {
    if (open) {
      dispatch(
        getAllBookings({
          branchId,
          start: moment().startOf("day").toDate(),
          end: moment().endOf("day").toDate(),
        })
      );
    }
  }, [open]);

  const handleChange = (e, bId) => {
    const {
      target: { value },
    } = e;

    setOtps({
      ...otps,
      [bId]: value,
    });
  };

  const handleSendOtp = (b) => {
    dispatch(
      getBookingOtp({
        mobile: b.contactNumber,
        bookingId: b.id || b._id,
      })
    );
  };

  const handleVerify = (b) => {
    dispatch(
      verifyBooking(
        {
          otp: otps[b.id || b._id],
          bookingId: b.id || b._id,
        },

        () => {
          setOtps({
            ...otps,
            [b.id || b._id]: "",
          });
          dispatch(
            getAllBookings({
              branchId,
              start: moment().startOf("day").toDate(),
              end: moment().endOf("day").toDate(),
            })
          );
        }
      )
    );
  };

  return (
    <ModalContainer
      open={open}
      onClose={() => {
        onClose();
        // setFormErrors();
        // reset();
      }}
      title={`Today's Reservations`}
      size="lg"
    >
      {bookings.length === 0 && (
        <Alert variant={"info"}>No bookings found today</Alert>
      )}

      {bookings.length > 0 && (
        <div class="table-responsive">
          <table class="table  mb-0 table-sm dt-responsive nowrap table-centered">
            <thead class="thead-dark ">
              <tr>
                <th>Table</th>
                <th>Booking Time</th>
                <th>Hosted By</th>
                <th>Mobile</th>

                <th>Status</th>

                <th>Action</th>
                <th>Otp</th>
                <th>Verify</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {bookings.map((b, i) => {
                const status = b.bookingStatus;

                const bId = b.id || b._id;

                return (
                  <tr key={i}>
                    <td>
                      {b?.tables?.map((t, ti) => {
                        return `${t.tableNumber} `;
                      })}
                      {b?.tables?.length === 0 && `-`}
                    </td>

                    <td>
                      {`${moment(b.start).format("HH:mm")}`} to{" "}
                      {`${moment(b.end).format("HH:mm")}`}
                    </td>

                    <td>{b.hostedBy}</td>
                    <td>{b.contactNumber}</td>
                    <td width="100px">
                      <span
                        class={`badge ${
                          b.bookingStatus === BOOKINGSTATUS[1].key
                            ? "badge-soft-success"
                            : "badge-soft-warning"
                        }`}
                      >
                        {b.bookingStatus}
                      </span>
                    </td>
                    <td width="100px">
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={status === BOOKINGSTATUS[1].key}
                        onClick={() => handleSendOtp(b)}
                      >
                        Send Otp
                      </button>
                    </td>
                    <td width="120px">
                      <input
                        type="number"
                        maxLength="4"
                        placeholder="Enter otp"
                        class="form-control form-control-sm"
                        disabled={status === BOOKINGSTATUS[1].key}
                        value={otps[bId]}
                        onChange={(e) => handleChange(e, bId)}
                      />
                    </td>

                    <td width="80px">
                      <button
                        className="btn btn-sm btn-primary"
                        disabled={
                          status === BOOKINGSTATUS[1].key ||
                          !otps[bId] ||
                          otps[bId]?.length < 4
                        }
                        onClick={() => handleVerify(b)}
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </ModalContainer>
  );
};

export default TodaysReservationModal;
