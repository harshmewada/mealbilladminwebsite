import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTables } from "../redux/action/tableActions";
import { getBranchCategories } from "../redux/action/categoryActions";

import { getBranchItems } from "../redux/action/itemActions";

import getToken from "./getToken";

function useFriendStatus(friendID) {
  const dispatch = useDispatch();
  const { restaurantId, branchId } = useSelector((state) => state.user);
  const [ready, setReady] = useState(false);

  const delayReady = () => {
    setReady(true);
  };
  function handleCheckToken() {
    const tkn = getToken();
    if (tkn) {
      dispatch(getAllTables(restaurantId, branchId, "true"))
        .then((res) => {
          delayReady(true);
        })
        .catch((err) => {
          delayReady(true);
        });

      dispatch(getBranchCategories(restaurantId, branchId, "true"));

      dispatch(getBranchItems(branchId, "true"));
    } else {
      delayReady(true);
    }
  }
  useEffect(() => {
    handleCheckToken();
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
