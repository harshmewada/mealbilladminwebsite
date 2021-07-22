import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/action/userActions";
import ToastContainer from "../components/common/ToastContainer";
import { useHistory } from "react-router";
import SiteAlert from "../components/common/SiteAlert";
import { showWarningAlert } from "../redux/action/alertActions";
import PrintComponent from "../components/PrintComponent";
import KOTPrintComponent from "../components/KOTcomponent/index";

const UtilComponent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isExpired = useSelector((state) => state.user.hasSubscriptionExpired);
  const isLogged = useSelector((state) => state.user.isLogged);
  const isElectron = window?.api?.isElectron;

  const { enablePrinting, enableKOT } = useSelector((state) => state.util);

  useEffect(() => {
    if (isExpired && isLogged) {
      history.push("/expired");
    }
    console.log("nav ", navigator.onLine);
  }, [isExpired, isLogged]);

  window.alert = (data) => dispatch(showWarningAlert(data));

  if (isElectron) {
    window.addEventListener("online", window.api.updateOnlineStatus);
    window.addEventListener("offline", window.api.updateOnlineStatus);
  }

  return (
    <React.Fragment>
      {enablePrinting && <PrintComponent />}
      {enableKOT && <KOTPrintComponent />}

      <ToastContainer />
      <SiteAlert />
    </React.Fragment>
  );
};

export default UtilComponent;
