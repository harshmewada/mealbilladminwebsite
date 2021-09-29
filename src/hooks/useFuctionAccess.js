import React from "react";
import { useSelector } from "react-redux";

const useFuctionAccess = () => {
  const userFunctionalitites = useSelector(
    (state) => state.user.allowedFuctionalities
  );

  const checkAccess = (acc) => userFunctionalitites.includes(acc);
  return checkAccess;
};

export default useFuctionAccess;
