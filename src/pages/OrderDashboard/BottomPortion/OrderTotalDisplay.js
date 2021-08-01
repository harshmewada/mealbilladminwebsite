import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteLocalOrder,
  setDiscount,
  setKOTitemsData,
  setOtherCharges,
  updateOrder,
  prePrintOrder,
} from "../../../redux/action/orderActions";
import { Curreny } from "../../../redux/types";
import OrderButton from "./OrderButton";
import OrderConfirmModal from "../../../components/common/Modals/OrderConfirmModal";
import { setKOTPrintData } from "../../../redux/action/utilActions";
import moment from "moment";
import { DATETIMEFORMAT, TYPESOFORDERS } from "../../../contants";

function parseFloat2Decimals(value) {
  return parseFloat(parseFloat(value).toFixed(2));
}
const styles = {
  rightContent: {
    color: "#000",
    textAlign: "right",
  },
  input: {
    textAlign: "right",

    width: "100%",
    height: "25px",
    lineHeight: "1px",
    border: "1px solid blue",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  colTitle: {
    fontWeight: 500,
    color: "#424242",
  },
  colValue: {
    color: "#424242",
  },
  colInput: {
    width: "50%",
  },
  grandTitle: {
    color: "#f0583c",
    fontWeight: 800,
  },
  grandValue: {
    color: "#006400",
    fontWeight: 600,
    fontSize: 20,
  },
};
const OrderTotalDisplay = () => {
  const dispatch = useDispatch();
  // const [discount, setDiscount] = React.useState(0);
  // const [otherCharges, setOtherCharges] = React.useState(0);
  const [orderConfirmOpen, setOrderConfirmOpen] = React.useState();
  const [prePrintOpen, setPrePrintOpen] = React.useState();

  const [KOTModalOpen, setKOTModalOpen] = React.useState(false);
  const [KOTData, setKOTData] = React.useState();

  const {
    activeOrderIndex: index,
    activeOrders,
    lastOrderNumber,
  } = useSelector((state) => state.order);

  const { name, restaurantId, branchId, branchCode, cgst, sgst } = useSelector(
    (state) => state.user
  );

  const { enableKOT, enablePrinting } = useSelector((state) => state.util);

  const discount = activeOrders[index]?.discount || 0;
  const otherCharges = activeOrders[index]?.otherCharges || 0;
  const customerName = activeOrders[index]?.customerName;
  const customerMobile = activeOrders[index]?.customerMobile;

  // React.useEffect(() => {
  //   setOtherCharges(0);
  //   setDiscount(0);
  // }, [index]);

  const toggleOrderConfirmModal = () => {
    setOrderConfirmOpen(!orderConfirmOpen);
  };

  const toggleKOTConfirmModal = () => {
    setKOTModalOpen(!KOTModalOpen);
  };

  const handleOpenMdoal = (type) => {
    if (activeOrders[index].items.length > 0) setOrderConfirmOpen(type);
    else {
      alert("No Items selected");
    }
  };

  const handleKOTButtonClick = () => {
    if (!activeOrders[index]) {
      return alert("No active order");
    }

    // setKOTModalOpen(kotData);
    toggleKOTConfirmModal();
  };

  const handlePrePrintOpen = () => {
    if (!activeOrders[index]) {
      return alert("No active order");
    }
    setPrePrintOpen(true);
  };

  const handleConfirmKOTOrder = (customerData) => {
    const active = activeOrders[index];
    let kotItems = [];

    //kot loop
    active.items.forEach((data) => {
      const foundItemIndex = active.lastKOTItems.findIndex(
        (lastitem) => lastitem.id === data.id
      );
      if (foundItemIndex > -1) {
        const foundItem = active.lastKOTItems[foundItemIndex];
        const diffrence = data.quantity - foundItem.quantity;
        if (diffrence === 0) {
        }
        if (diffrence > 0) {
          kotItems.push({ ...data, quantity: diffrence });
        }
        // else {
        //   kotItems.push({ ...data, quantity: diffrence });
        // }
      } else {
        kotItems.push({ ...data });
      }
    });

    let ItemsQuantity = 0;
    kotItems.map((item) => {
      ItemsQuantity = ItemsQuantity + item.quantity;
    });
    const kotData = {
      branchOrderNumber: `# ${lastOrderNumber + index + 1}`,
      orderType: active.orderType,
      orderItems: kotItems,
      orderDate: moment().format(DATETIMEFORMAT),
      tableNumber: active?.tableNumber,

      totalQuantity: ItemsQuantity,
    };
    dispatch(
      setKOTPrintData({
        ...kotData,
        ...customerData,
      })
    );
    dispatch(setKOTitemsData(kotItems));
    toggleKOTConfirmModal();
  };

  const handleConfirmOrder = (customerData, paymentData, others, cb) => {
    const currentOrderType = TYPESOFORDERS.find(
      (data) => data.value === activeOrders[index].orderType
    );
    let orderdata = {
      ...getData(),
      otherCharges: parseFloat2Decimals(getData().otherCharges),
      discount: parseFloat2Decimals(getData().discount),
      orderTypeName: currentOrderType.key,
      grandTotal: parseFloat(getData().grandTotal),
      orderItems: activeOrders[index].items,
      orderBy: name,

      paymentType: undefined,
      paymentTypeId: undefined,
      tableNumber: activeOrders[index].tableNumber,
      tableId: activeOrders[index]._id,
      restaurantId,
      branchId,
      orderNumber: lastOrderNumber + (activeOrders.length - index),
      branchCode: branchCode,
      orderType: activeOrders[index].orderType,
      isPaid: false,
      ...customerData,
      ...paymentData,
      ...others,
    };

    setPrePrintOpen(false);

    dispatch(
      confirmOrder(orderdata, (data) => {
        setOtherCharges(0);
        setDiscount(0);
        if (!enablePrinting) {
          toggleOrderConfirmModal();

          // console.log("confirmdata", data);
          dispatch(deleteLocalOrder(index));
        }
        cb && cb();
        //
      })
    );
  };
  const handleUpdateOrder = (payment, customerData) => {
    console.log("if");
    const paymentData = {
      paymentType: payment.type,
      paymentTypeId: payment.id,
    };
    if (!enablePrinting) {
      handleConfirmOrder(customerData, paymentData, {
        isPaid: true,
      });
      return null;
    }

    const currentOrder = activeOrders[index];

    if (!currentOrder) {
      toggleOrderConfirmModal();

      return alert("No active order");
    }
    if (
      currentOrder?.isPaid === false &&
      currentOrder?.isOrderConfirmed === true
    ) {
      const updateData = {
        refId: currentOrder.refId,
        paymentType: payment.type,
        paymentTypeId: payment.id,
        restaurantId: currentOrder.restaurantId,

        _id: currentOrder._id,
        isPaid: true,
        ...customerData,
      };

      dispatch(
        updateOrder(updateData, () => {
          setOtherCharges(0);
          setDiscount(0);
          toggleOrderConfirmModal();
          dispatch(deleteLocalOrder(index));
        })
      );
    } else {
      handleConfirmOrder(
        customerData,
        paymentData,
        {
          isPaid: true,
        },
        () => {
          toggleOrderConfirmModal();

          dispatch(deleteLocalOrder(index));
        }
      );
    }
  };
  const getData = (mydiscount) => {
    let itemsTotal = 0;
    let cgstCharges = 0;

    let sgstCharges = 0;
    let grandTotal = 0;
    let tablePrice = 0;
    let taxTotal = 0;

    if (activeOrders[index]) {
      activeOrders[index].items.forEach((item) => {
        itemsTotal += item.itemTotal;
      });

      cgstCharges = (itemsTotal * cgst) / 100;

      sgstCharges = (itemsTotal * sgst) / 100;
      tablePrice = activeOrders[index].tablePrice;
    }
    grandTotal =
      itemsTotal +
      cgstCharges +
      sgstCharges +
      tablePrice +
      parseFloat(otherCharges || 0) -
      parseFloat(discount || 0);

    taxTotal = parseFloat(cgstCharges + sgstCharges);
    return {
      itemsTotal,
      cgstCharges,
      sgstCharges,
      otherCharges,
      taxTotal,
      discount,
      tablePrice,
      refId: activeOrders[index]?.refId,
      grandTotal: grandTotal.toFixed(2),
    };
  };

  const onPrePrint = (customer) => {
    const customerData = {
      customerName,
      customerMobile,
    };
    let orderdata = {
      ...getData(),
      otherCharges: parseFloat2Decimals(getData().otherCharges),
      discount: parseFloat2Decimals(getData().discount),

      grandTotal: parseFloat(getData().grandTotal),
      orderItems: activeOrders[index].items,
      orderBy: name,
      paymentType: undefined,
      paymentTypeId: undefined,
      tableNumber: activeOrders[index].tableNumber,
      tableId: activeOrders[index]._id,
      restaurantId,
      branchId,
      orderNumber: lastOrderNumber + (activeOrders.length - index),
      branchCode: branchCode,
      orderType: activeOrders[index].orderType,
      ...customerData,
      ...customer,
    };
    dispatch(prePrintOrder(orderdata));
    setOtherCharges(0);
    setDiscount(0);
    setPrePrintOpen(false);
  };
  const rendertableData = [
    [
      { title: "SubTotal", hasCurrency: true, value: getData().itemsTotal },
      { title: "CGST", hasCurrency: true, value: getData().cgstCharges },
      { title: "SGST", hasCurrency: true, value: getData().sgstCharges },
    ],
    [
      {
        title: "Table Charges",
        hasCurrency: true,
        value: getData().tablePrice,
      },
      {
        title: "O. Charges",
        hasCurrency: true,
        input: () => (
          <input
            className={"form-control"}
            maxLength="6"
            style={styles.input}
            value={getData().otherCharges}
            onChange={(e) => {
              if (parseFloat(e.target.value) >= 0) {
                dispatch(setOtherCharges(e.target.value));
              } else {
                dispatch(setOtherCharges(0));
              }
            }}
          />
        ),
      },
      {
        title: "Discount",
        hasCurrency: true,
        input: () => (
          <input
            maxLength="6"
            min="0"
            max={"100"}
            className={"form-control"}
            style={styles.input}
            value={discount}
            onChange={(e) => {
              if (
                parseFloat(e.target.value) >= parseFloat(getData().grandTotal)
              ) {
                alert("Maximum Discount Reached");
                dispatch(
                  setDiscount(
                    parseFloat(getData().discount) +
                      parseFloat(getData().grandTotal)
                  )
                );
              } else {
                console.log("discount else");

                dispatch(setDiscount(e.target.value));
              }
            }}
          />
        ),
      },
    ],
  ];
  return (
    <div class="row">
      <table class="table table-sm table-bordered col-lg-8 mb-0">
        <tbody>
          {rendertableData.map((row, index) => {
            return (
              <tr key={index}>
                {row.map((col, colindex) => {
                  const colInput = col.input;
                  return (
                    <>
                      <td width="25%" key={colindex}>
                        <div style={styles.row}>
                          <div style={styles.colTitle}>{col.title}</div>
                          {col.value && (
                            <div style={styles.colValue}>{col.value}</div>
                          )}
                          {col.input && (
                            <div style={styles.colInput}>{colInput()}</div>
                          )}
                        </div>
                      </td>
                    </>
                  );
                })}
                {index === 0 && (
                  <td rowSpan="2">
                    <div style={styles.row}>
                      <div style={styles.grandTitle}>
                        Grand
                        <br /> Total
                      </div>
                      <div style={styles.grandValue}>
                        {getData().grandTotal}
                      </div>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="col-md-4 mb-0">
        <OrderButton
          enableKOT={enableKOT}
          enablePrinting={enablePrinting}
          onKOTButtonClick={() => handleKOTButtonClick()}
          // onPrePrint={() => handlePrePrintOpen()}
          onPrePrint={() => handlePrePrintOpen()}
          onClick={(type) => {
            handleOpenMdoal(type);
          }}
        />
      </div>

      {prePrintOpen && (
        <OrderConfirmModal
          open={prePrintOpen}
          text={`Grand total : ${Curreny} ${getData().grandTotal}`}
          onConfirm={(customerData) => handleConfirmOrder(customerData)}
          onCancel={() => setPrePrintOpen()}
          customerName={customerName}
          customerMobile={customerMobile}
        />
      )}
      {orderConfirmOpen && (
        <OrderConfirmModal
          open={orderConfirmOpen}
          text={`Grand total : ${Curreny} ${getData().grandTotal}`}
          onConfirm={(customerData) =>
            handleUpdateOrder(orderConfirmOpen, customerData)
          }
          onCancel={() => toggleOrderConfirmModal()}
          customerName={customerName}
          customerMobile={customerMobile}
        />
      )}
      {enableKOT && KOTModalOpen && (
        <OrderConfirmModal
          enableRemarks
          open={KOTModalOpen}
          text={`Confirm Kot`}
          onConfirm={(customerData) => handleConfirmKOTOrder(customerData)}
          onCancel={() => toggleKOTConfirmModal()}
          customerName={customerName}
          customerMobile={customerMobile}
        />
      )}
    </div>
  );
};

export default OrderTotalDisplay;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { confirmOrder } from "../../../redux/action/orderActions";
// import { showSnackBar } from "../../../redux/action/snackActions";
// import { Curreny } from "../../../redux/types";
// import OrderButton from "./OrderButton";
// import OrderConfirmModal from "./OrderConfirmModal";
// const styles = {
//   rightContent: {
//     color: "#000",
//     textAlign: "right",
//   },
//   input: {
//     textAlign: "right",
//     marginLeft: "10px",
//     width: "50%",
//     height: "25px",
//     lineHeight: "1px",
//   },
// };
// const OrderTotalDisplay = () => {
//   const dispatch = useDispatch();
//   const [discount, setDiscount] = React.useState(0);
//   const [otherCharges, setOtherCharges] = React.useState(0);
//   const [orderConfirmOpen, setOrderConfirmOpen] = React.useState();
//   const { name, restaurantId, branchId, branchCode, cgst, sgst } = useSelector(
//     (state) => state.user
//   );

//   const toggleOrderConfirmModal = () => {
//     setOrderConfirmOpen(!orderConfirmOpen);
//   };

//   const handleOpenMdoal = (type) => {
//     if (activeOrders[index].items.length > 0) setOrderConfirmOpen(type);
//     else {
//       alert("No Items selected");
//     }
//   };

//   const handleConfirmOrder = (payment) => {
//     let orderdata = {
//       ...getData(),
//       grandTotal: parseFloat(getData().grandTotal),
//       orderItems: activeOrders[index].items,
//       orderBy: name,
//       paymentType: payment.type,
//       paymentTypeId: payment.id,
//       tableNumber: activeOrders[index].tableNumber,
//       tableId: activeOrders[index]._id,
//       restaurantId,
//       branchId,
//       orderNumber: lastOrderNumber + (activeOrders.length - index),
//       branchCode: branchCode,
//     };

//     toggleOrderConfirmModal();

//     dispatch(confirmOrder(orderdata))
//       .then((res) => {
//         if (res.payload.status === 200) {
//           dispatch(showSnackBar("Order Successfull"));
//         } else {
//           dispatch(showSnackBar("Failed To Order"));
//         }
//       })

//       .catch((err) => {
//         dispatch(showSnackBar("Failed To Order"));
//       });
//   };

//   const { activeTable: index, activeOrders, lastOrderNumber } = useSelector(
//     (state) => state.order
//   );

//   const getData = () => {
//     let itemsTotal = 0;
//     let cgstCharges = 0;

//     let sgstCharges = 0;
//     let grandTotal = 0;
//     let tablePrice = 0;
//     if (activeOrders[index]) {
//       activeOrders[index].items.forEach((item) => {
//         itemsTotal += item.itemTotal;
//       });

//       cgstCharges = (itemsTotal * cgst) / 100;

//       sgstCharges = (itemsTotal * sgst) / 100;
//       tablePrice = activeOrders[index].tablePrice;
//     }
//     grandTotal =
//       itemsTotal +
//       cgstCharges +
//       sgstCharges +
//       tablePrice +
//       parseFloat(otherCharges || 0) -
//       parseFloat(discount || 0);
//     return {
//       itemsTotal,
//       cgstCharges,
//       sgstCharges,
//       otherCharges,
//       discount,
//       tablePrice,
//       grandTotal: grandTotal.toFixed(2),
//     };
//   };
//   return (
//     <div>
//       <div className="row">
//         <div className="col-md-4" />
//         <div className="col-md-8">
//           <table class="table table-sm mb-1">
//             <tbody>
//               <tr>
//                 <td>SubTotal</td>
//                 <td style={styles.rightContent}>
//                   {Curreny} {getData().itemsTotal}
//                 </td>
//               </tr>
//               <tr>
//                 <td>CGST</td>
//                 <td style={styles.rightContent}>
//                   {Curreny} {getData().cgstCharges}
//                 </td>
//               </tr>
//               <tr>
//                 <td>SGST</td>
//                 <td style={styles.rightContent}>
//                   {" "}
//                   {Curreny} {getData().sgstCharges}
//                 </td>
//               </tr>
//               <tr>
//                 <td>Table Charges</td>
//                 <td style={styles.rightContent}>
//                   {Curreny} {getData().tablePrice}
//                 </td>
//               </tr>
//               <tr>
//                 <td style={{ whiteSpace: "nowrap" }}>Other Charges</td>
//                 <td className="d-flex justify-content-end">
//                   <input
//                     className={"form-control"}
//                     style={styles.input}
//                     value={getData().otherCharges}
//                     onChange={(e) => setOtherCharges(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>Discount</td>
//                 <td className="d-flex justify-content-end">
//                   <input
//                     className={"form-control"}
//                     style={styles.input}
//                     value={getData().discount}
//                     onChange={(e) => setDiscount(e.target.value)}
//                   />
//                 </td>
//               </tr>

//               <tr>
//                 <td>Grand Total</td>
//                 <td style={styles.rightContent}>
//                   {Curreny} {getData().grandTotal}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-12">
//           <OrderButton
//             onClick={(type) => {
//               handleOpenMdoal(type);
//             }}
//           />
//         </div>
//       </div>

//       {orderConfirmOpen && (
//         <OrderConfirmModal
//           text={`Grand total : ${Curreny} ${getData().grandTotal}`}
//           onConfirm={() => handleConfirmOrder(orderConfirmOpen)}
//           onCancel={() => toggleOrderConfirmModal()}
//         />
//       )}
//     </div>
//   );
// };

// export default OrderTotalDisplay;
