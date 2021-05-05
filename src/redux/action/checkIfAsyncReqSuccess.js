import getErrorMessage from "../../helpers/getErrorMessage";
import { showSnackBar } from "./snackActions";

const checkIfAsyncReqSuccess = (dispatch, mainReq) => {
  const { successMessage, errorMessage, cb, enableMessage } = mainReq;

  const succMessage = (res) =>
    enableMessage ? res.payload.data.message || successMessage : successMessage;
  const errMessage = (error) =>
    enableMessage ? getErrorMessage(error) || errorMessage : errorMessage;

  try {
    dispatch(mainReq)
      .then((res) => {
        if (res.payload.status === 200 && succMessage(res)) {
          dispatch(showSnackBar(succMessage(res)));
          cb &&
            cb({
              status: res.payload.status,
              data: res.payload.data,
            });
        } else if (succMessage(res)) {
          dispatch(showSnackBar(succMessage(res), "error"));
        }
      })
      .catch((err) => {
        if (err && errMessage(err)) {
          dispatch(showSnackBar(errMessage(err) || "Failed", "error"));
        }
      });
  } catch {
    dispatch(showSnackBar(errMessage() || "Failed", "error"));
  }
};
export default checkIfAsyncReqSuccess;
