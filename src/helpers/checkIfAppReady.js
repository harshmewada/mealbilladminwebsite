import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserDetails } from "../redux/action/userActions";
import { setKOT, setPrinting } from "../redux/action/utilActions";
import getLocalKOTPrintEnable from "./getLocalKOTPrintEnable";
import getLocalPrintEnable from "./getLocalPrintEnable";
import getToken from "./getToken";

function useFriendStatus(friendID) {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);

  const delayReady = () => {
    setReady(true);
  };

  function handlePrintingServices() {
    const enablePrinting = getLocalPrintEnable();
    const enableKOT = getLocalKOTPrintEnable();

    if (enablePrinting) {
      dispatch(setPrinting(enablePrinting));
    }

    if (enableKOT) {
      dispatch(setKOT(enableKOT));
    }
  }
  function handleCheckToken() {
    const tkn = getToken();
    console.log("handleCheckToken", tkn);
    if (tkn) {
      dispatch(getUserDetails())
        .then((res) => {
          delayReady(true);
        })
        .catch((err) => {
          delayReady(true);
        });
    } else {
      delayReady(true);
    }
  }
  useEffect(() => {
    handleCheckToken();
    handlePrintingServices();
  }, []);

  return ready;
}
export default useFriendStatus;

// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import getToken from "./getToken";
// import { getUserDetails } from "../redux/action/userActions";

// const checkIfAppReady = (data) => {
// const dispatch = useDispatch();
//   const [ready, setReady] = useState(false);

// const delayReady = () => {
//   setReady(true);
// };
// async function handleCheckToken() {
//   const tkn = await getToken();
//   if (tkn) {
//     // dispatch(getUserDetails())
//     //   .then((res) => {
//     //     delayReady(true);
//     //   })
//     //   .catch((err) => {
//     //     delayReady(true);
//     //   });
//   } else {
//     delayReady(true);
//   }
// }

//   useLayoutEffect(() => {
//     handleCheckToken();
//   }, []);

//   return ready;
// };

// export default checkIfAppReady;
