import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURRENCY, ITEMSTATUS, TYPESOFORDERS } from "../../../contants";

import ItemQuantitySelector from "./ItemQuantitySelector";
import { Button, Collapse } from "react-bootstrap";
import ListItemSelector from "./ListItemSelector";

const getColor = (type) => {
  if (type === 1) {
    return { backgroundColor: "#ffeaad" };
  }
  if (type === 2) {
    return { backgroundColor: "#c6ffba" };
  }
  if (type === 0) {
    return { backgroundColor: "#e3c8fa" };
  }
};

const getBgColor = (type, kotQuantity, quantity) => {
  const percentage = (kotQuantity / quantity) * 100;
  if (type === 1) {
    return `linear-gradient(90deg,#ffff8f ${percentage}%, #fff ${percentage}%)`;
  }
  return ITEMSTATUS.find((d) => d.value === type).bgColor;
};
const styles = {
  container: {
    marginTop: "5px",
  },
  accordionHeader: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
};

const ActiveOrderSelector = ({
  tables,
  lastOrderNumber,
  activeOrders,
  activeOrdersLength,
  active,
  branchCode,
  handleItemQuantity,

  deleteItem,
  makeTableActive,
  deletable,

  scrollable,
  deleteOrder,
  allItems,
  clearCount,
  handleSearchAndAddItem,
  disabled,
  hideSearch,
  orderType,
  isEditMode,
}) => {
  const dispatch = useDispatch();
  const tablesRef = React.useRef([]);

  React.useEffect(() => {
    if (scrollable)
      tablesRef.current = tablesRef.current.slice(0, tables.length);
  }, [tables]);
  const executeScroll = (index) => {
    index &&
      tablesRef.current[tables.length - index] &&
      tablesRef.current[tables.length - index].scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
  };

  React.useEffect(() => {
    scrollable && executeScroll(active);
  }, [active]);
  return [...tables].reverse().map((data, dataIndex) => {
    const index = activeOrdersLength - 1 - dataIndex;
    const orderDeletable = data.KOTS.length === 0;
    const isActive = data.refId === active?.refId;

    const disableEverything = disabled
      ? true
      : data?.isEdited
      ? false
      : data.isOrderConfirmed;

    return (
      <>
        <div
          class="card border mb-1 shadow-none"
          // style={{ overflow: "auto" }}
          ref={(el) => (tablesRef.current[dataIndex] = el)}
        >
          <div
            class={`card-header ${isActive ? "bg-purple " : ""}`}
            style={{
              padding: "10px 10px",
              ...getColor(data.orderTypeId),
            }}
            onClick={() => makeTableActive(data.refId)}
          >
            <a
              href="javascript:void(0);"
              class={`text-dark mb-0 pb-0`}
              data-toggle="collapse"
              data-target={`#collapseOne${index}`}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <div className="row " style={{ width: "100%" }}>
                {/* <div className="col-md-12 "> */}
                <div className="col-md-8">
                  {data.tableNumber ? (
                    <span
                      style={{
                        color: isActive ? "white" : undefined,
                      }}
                    >
                      Table Number: {data.tableNumber}{" "}
                    </span>
                  ) : (
                    <span
                      style={{
                        color: isActive ? "white" : undefined,
                      }}
                    >
                      {data?.orderType}
                    </span>
                  )}
                </div>
                <div className="col-md-2">
                  <span style={{ color: isActive ? "white" : undefined }}>
                    {data?.orderItems?.length} Items
                  </span>
                </div>
                {orderDeletable && !isEditMode && (
                  <div className="col-md-2 d-flex justify-content-end">
                    <span>
                      <a
                        href="javascript:void(0);"
                        onClick={() => deleteOrder(data.refId)}
                      >
                        <i
                          class={`mdi mdi-close-circle font-16 ${
                            isActive ? `text-primary` : " text-danger "
                          }`}
                        ></i>
                      </a>
                    </span>
                  </div>
                )}

                {/* </div> */}
                <div className="col-md-8">
                  <span
                    className={
                      isActive ? "badge badge-dark" : "badge badge-primary"
                    }
                    style={{ color: isActive ? "white" : undefined }}
                  >
                    {data?.branchOrderNumber}
                  </span>
                </div>
                <div className="col-md-4">
                  {isActive &&
                    active?.branchOrderNumber &&
                    active?.isOrderConfirmed && (
                      <span
                        className={"badge badge-warning"}
                        style={{ color: "black" }}
                      >
                        Confirmed
                      </span>
                    )}
                  {isActive && active?.branchOrderNumber && active?.isPaid && (
                    <span
                      className={"badge badge-success ml-1"}
                      style={{ color: "black" }}
                    >
                      Paid
                    </span>
                  )}
                  {/* {isActive && active?.isEdited && (
                    <span
                      className={"badge badge-light"}
                      style={{ color: "black" }}
                    >
                      Editing
                    </span>
                  )} */}
                </div>
              </div>
            </a>
          </div>
          <Collapse in={isActive}>
            <div class=" mt-0 pt-0 pl-1 pr-1 ">
              {data?.orderItems?.length > 0 ? (
                <table class="table table-sm mb-0 ordertable">
                  <tbody>
                    {data.orderItems.map((item, index) => {
                      const { itemId } = item;
                      const isConfirmed =
                        isEditMode || item.itemStatusId >= ITEMSTATUS[1].value;

                      return (
                        <tr
                          key={index}
                          style={{
                            background: getBgColor(
                              item.itemStatusId,
                              item.kotQuantity,
                              item.quantity
                            ),
                          }}
                        >
                          {/* <th scope="row">{index + 1}</th> */}
                          <td>{item.itemName}</td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            {CURRENCY} {item.itemPrice}{" "}
                          </td>
                          <td>
                            <ItemQuantitySelector
                              quantity={item.quantity}
                              setQuantity={(quantity) =>
                                handleItemQuantity({ quantity, itemId })
                              }
                              deleteItem={() => deleteItem(itemId)}
                              isOrderConfirmed={disableEverything}
                              isKotCompleted={!isEditMode && isConfirmed}
                            />
                          </td>

                          <td className="text-right">
                            {CURRENCY}
                            {item.itemTotal}
                          </td>

                          {!isConfirmed && (
                            <td>
                              <a
                                href="javascript:void(0);"
                                onClick={() => deleteItem(itemId)}
                              >
                                <i class="mdi mdi-close-circle-outline text-danger font-16"></i>
                              </a>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p class="mb-0 text-muted p-2">No Items Selected</p>
              )}
              {!hideSearch && (
                <ListItemSelector
                  allItems={allItems}
                  clearCount={clearCount}
                  handleSearchAndAddItem={handleSearchAndAddItem}
                />
              )}
            </div>
          </Collapse>
        </div>
      </>
    );
  });
};

export default ActiveOrderSelector;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { TYPESOFORDERS } from "../../../contants";
// import {
//   changeItemQuantity,
//   removeItem,
//   setActiveOrder,
// } from "../../../redux/action/orderActions";
// import { CURRENCY } from "../../../redux/types";
// import ItemQuantitySelector from "./ItemQuantitySelector";

// const styles = {
//   container: {
//     marginTop: "5px",
//   },
//   accordionHeader: {
//     cursor: "pointer",
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
// };

// const ActiveOrderSelector = ({ tables }) => {
//   const dispatch = useDispatch();

//   const active = useSelector((state) => state.order.activeOrderIndex);
//   const { lastOrderNumber, activeOrders } = useSelector((state) => state.order);
//   const branchCode = useSelector((state) => state.user.branchCode);

//   const handleItemQuantity = (quantity, itemindex) => {
//     dispatch(changeItemQuantity(parseInt(quantity), itemindex));
//   };
//   const deleteItem = (index) => {
//     dispatch(removeItem(index));
//   };

//   const makeTableActive = (tableNumber, index) => {
//     dispatch(setActiveOrder(index));
//   };
//   return [...tables].reverse().map((data, dataIndex) => {
//     const index = activeOrders.length - 1 - dataIndex;
//     return (
//       <div
//         key={index}
//         class="accordion"
//         id="accordionExample"
//         style={styles.container}
//       >
//         <div class="card border mb-1 shadow-none">
//           <div
//             class={`card-header ${isActive ? "bg-purple " : ""}`}
//             style={{
//               padding: "10px 10px",
//             }}
//             onClick={() => makeTableActive(data.tableNumber, index)}
//           >
//             <a
//              href="javascript:void(0);"
//               class={`text-dark mb-0 pb-0` }
//               data-toggle="collapse"
//               data-target={`#collapseOne${index}`}
//               aria-expanded="true"
//               aria-controls="collapseOne"
//             >
//               <div className="row " style={{ width: "100%" }}>
//                 <div className="col-md-12 d-flex justify-content-between">
//                   {data.tableNumber ? (
//                     <span
//                       style={{ color: isActive ? "white" : undefined }}
//                     >
//                       Table Number: {data.tableNumber}
//                     </span>
//                   ) : (
//                     <span
//                       style={{ color: isActive ? "white" : undefined }}
//                     >
//                       {
//                         TYPESOFORDERS.find((DATA, INDEX) => {
//                           return DATA.value === data.orderType;
//                         }).key
//                       }
//                     </span>
//                   )}
//                   <span
//                     style={{ color: isActive ? "white" : undefined }}
//                   >
//                     {data.items.length} Items
//                   </span>
//                   <span
//                     style={{ color: isActive ? "white" : undefined }}
//                   >
//                     {data.associatedPerson}
//                   </span>
//                 </div>
//                 <div className="col-md-12">
//                   <span
//                     className={
//                       isActive
//                         ? "badge badge-dark"
//                         : "badge badge-primary"
//                     }
//                     style={{ color: isActive ? "white" : undefined }}
//                   >
//                     # {branchCode + (lastOrderNumber + index + 1)}
//                   </span>
//                 </div>
//               </div>
//             </a>
//           </div>
//           <div
//             id={`collapseOne${index}`}
//             class="collapse "
//             aria-labelledby="headingOne"
//             data-parent="#accordionExample"
//           >
//             <div class=" mt-0 pt-0 pl-1 pr-1 ">
//               {data.items.length > 0 ? (
//                 <table class="table table-sm mb-0">
//                   <tbody>
//                     {data.items.map((item, index) => {
//                       return (
//                         <tr key={index}>
//                           {/* <th scope="row">{index + 1}</th> */}
//                           <td>{item.itemName}</td>
//                           <td>
//                             {CURRENCY} {item.itemPrice}
//                           </td>
//                           <td>
//                             <ItemQuantitySelector
//                               quantity={item.quantity}
//                               setQuantity={(quantity) =>
//                                 handleItemQuantity(quantity, index)
//                               }
//                               deleteItem={() => deleteItem(index)}
//                             />
//                           </td>

//                           <td className="text-right">
//                             {CURRENCY}
//                             {item.itemTotal}
//                           </td>

//                           <td>
//                             <a href="javascript:void(0);" onClick={() => deleteItem(index)}>
//                               <i class="mdi mdi-close-circle-outline text-danger font-16"></i>
//                             </a>
//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p class="mb-0 text-muted p-2">No Items Selected</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   });
// };

// export default ActiveOrderSelector;
