import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../redux/action/userActions";
import ToastContainer from "../components/common/ToastContainer";

const UtilComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails());
  }, []);
  return (
    <React.Fragment>
      <ToastContainer />
    </React.Fragment>
  );
};

export default UtilComponent;
