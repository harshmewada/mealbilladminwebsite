import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteLocalOrder,
} from "../../../redux/action/orderActions";
import { showSnackBar } from "../../../redux/action/snackActions";
import { setPrintData } from "../../../redux/action/utilActions";
import { Curreny } from "../../../redux/types";
import OrderButton from "./OrderButton";
import OrderConfirmModal from "./OrderConfirmModal";

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
  const [discount, setDiscount] = React.useState(0);
  const [otherCharges, setOtherCharges] = React.useState(0);
  const [orderConfirmOpen, setOrderConfirmOpen] = React.useState();
  const { name, restaurantId, branchId, branchCode, cgst, sgst } = useSelector(
    (state) => state.user
  );

  const { activeOrderIndex } = useSelector((state) => state.order);

  React.useEffect(() => {
    setOtherCharges(0);
    setDiscount(0);
  }, [activeOrderIndex]);

  const toggleOrderConfirmModal = () => {
    setOrderConfirmOpen(!orderConfirmOpen);
  };

  const handleOpenMdoal = (type) => {
    if (activeOrders[index].items.length > 0) setOrderConfirmOpen(type);
    else {
      alert("No Items selected");
    }
  };

  const handleConfirmOrder = (payment, customerMobile) => {
    let orderdata = {
      ...getData(),
      otherCharges: parseFloat2Decimals(getData().otherCharges),
      discount: parseFloat2Decimals(getData().discount),

      grandTotal: parseFloat(getData().grandTotal),
      orderItems: activeOrders[index].items,
      orderBy: name,
      paymentType: payment.type,
      paymentTypeId: payment.id,
      tableNumber: activeOrders[index].tableNumber,
      tableId: activeOrders[index]._id,
      restaurantId,
      branchId,
      orderNumber: lastOrderNumber + (activeOrders.length - index),
      branchCode: branchCode,
      orderType: activeOrders[index].orderType,
      customerMobile: customerMobile,
    };

    toggleOrderConfirmModal();

    dispatch(confirmOrder(orderdata))
      .then((res) => {
        if (res.payload.status === 200) {
          dispatch(showSnackBar("Order Successfull"));
          setOtherCharges(0);
          setDiscount(0);
          dispatch(setPrintData(activeOrders[index]));
          dispatch(deleteLocalOrder(activeOrderIndex));
        } else {
          dispatch(showSnackBar("Failed To Order", "error"));
        }
      })

      .catch((err) => {
        console.log("fail", err);
        dispatch(showSnackBar("Failed To Order", "error"));
      });
  };

  const {
    activeOrderIndex: index,
    activeOrders,
    lastOrderNumber,
  } = useSelector((state) => state.order);

  const getData = (mydiscount) => {
    // const calculateddiscount = mydiscount || discount;
    // console.log("discount getdata", mydiscount, calculateddiscount);
    let itemsTotal = 0;
    let cgstCharges = 0;

    let sgstCharges = 0;
    let grandTotal = 0;
    let tablePrice = 0;
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
    return {
      itemsTotal,
      cgstCharges,
      sgstCharges,
      otherCharges,
      discount,
      tablePrice,
      grandTotal: grandTotal.toFixed(2),
    };
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
                setOtherCharges(e.target.value);
              } else {
                setOtherCharges(0);
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
                setDiscount(
                  parseFloat(getData().discount) +
                    parseFloat(getData().grandTotal)
                );
              } else {
                console.log("discount else");

                setDiscount(e.target.value);
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
          onClick={(type) => {
            handleOpenMdoal(type);
          }}
        />
      </div>

      {orderConfirmOpen && (
        <OrderConfirmModal
          open={orderConfirmOpen}
          text={`Grand total : ${Curreny} ${getData().grandTotal}`}
          onConfirm={(mobile) => handleConfirmOrder(orderConfirmOpen, mobile)}
          onCancel={() => toggleOrderConfirmModal()}
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
