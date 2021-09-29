import { KITCHEN_DISPLAY } from "../../contants";
import getErrorMessage from "../../helpers/getErrorMessage";
import { showSnackBar } from "./snackActions";

const socketAction = ({ dispatch, getState, request }) => {
  const { allowedFuctionalities, restaurantId, branchId } = getState().user;

  const shouldSocket = allowedFuctionalities.includes(KITCHEN_DISPLAY);

  console.log("shouldSocket", shouldSocket);

  // const { successMessage, errorMessage, cb, enableMessage, errorCb } = request;

  // const succMessage = (res) =>
  //   enableMessage ? res.payload.data.message || successMessage : successMessage;
  // const errMessage = (error) =>
  //   enableMessage ? getErrorMessage(error) || errorMessage : errorMessage;

  // try {
  //   dispatch(request)
  //     .then((res) => {
  //       if (res.payload.status === 200 && succMessage(res)) {
  //         dispatch(showSnackBar(succMessage(res)));
  //         cb &&
  //           cb({
  //             status: res.payload.status,
  //             data: res.payload.data,
  //           });
  //       } else if (succMessage(res)) {
  //         errorCb && errorCb();
  //         dispatch(showSnackBar(succMessage(res), "error"));
  //       }
  //     })
  //     .catch((err) => {
  //       if (err && errMessage(err)) {
  //         errorCb && errorCb();
  //         dispatch(showSnackBar(errMessage(err) || "Failed", "error"));
  //       }
  //     });
  // } catch {
  //   errorCb && errorCb();
  //   dispatch(showSnackBar(errMessage() || "Failed", "error"));
  // }
};
export default socketAction;
