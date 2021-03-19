import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmOrder } from "../../../redux/action/orderActions";
import { showSnackBar } from "../../../redux/action/snackActions";
import { Curreny } from "../../../redux/types";
import OrderButton from "./OrderButton";
import OrderConfirmModal from "./OrderConfirmModal";
const styles = {
  rightContent: {
    color: "#000",
    textAlign: "right",
  },
  input: {
    textAlign: "right",
    marginLeft: "10px",
    width: "50%",
    height: "25px",
    lineHeight: "1px",
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

  const toggleOrderConfirmModal = () => {
    setOrderConfirmOpen(!orderConfirmOpen);
  };

  const handleOpenMdoal = (type) => {
    if (activeTables[index].items.length > 0) setOrderConfirmOpen(type);
    else {
      alert("No Items selected");
    }
  };

  const handleConfirmOrder = (payment) => {
    let orderdata = {
      ...getData(),
      grandTotal: parseFloat(getData().grandTotal),
      orderItems: activeTables[index].items,
      orderBy: name,
      paymentType: payment.type,
      paymentTypeId: payment.id,
      tableNumber: activeTables[index].tableNumber,
      tableId: activeTables[index]._id,
      restaurantId,
      branchId,
      orderNumber: lastOrderNumber + (activeTables.length - index),
      branchCode: branchCode,
    };

    toggleOrderConfirmModal();

    dispatch(confirmOrder(orderdata))
      .then((res) => {
        if (res.payload.status === 200) {
          dispatch(showSnackBar("Order Successfull"));
        } else {
          dispatch(showSnackBar("Failed To Order"));
        }
      })

      .catch((err) => {
        dispatch(showSnackBar("Failed To Order"));
      });
  };

  const { activeTable: index, activeTables, lastOrderNumber } = useSelector(
    (state) => state.order
  );

  const getData = () => {
    let itemsTotal = 0;
    let cgstCharges = 0;

    let sgstCharges = 0;
    let grandTotal = 0;
    let tablePrice = 0;
    if (activeTables[index]) {
      activeTables[index].items.forEach((item) => {
        itemsTotal += item.itemTotal;
      });

      cgstCharges = (itemsTotal * cgst) / 100;

      sgstCharges = (itemsTotal * sgst) / 100;
      tablePrice = activeTables[index].tablePrice;
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
  return (
    <div>
      <div className="row">
        <div className="col-md-4" />
        <div className="col-md-8">
          <table class="table table-sm mb-1">
            <tbody>
              <tr>
                <td>SubTotal</td>
                <td style={styles.rightContent}>
                  {Curreny} {getData().itemsTotal}
                </td>
              </tr>
              <tr>
                <td>CGST</td>
                <td style={styles.rightContent}>
                  {Curreny} {getData().cgstCharges}
                </td>
              </tr>
              <tr>
                <td>SGST</td>
                <td style={styles.rightContent}>
                  {" "}
                  {Curreny} {getData().sgstCharges}
                </td>
              </tr>
              <tr>
                <td>Table Charges</td>
                <td style={styles.rightContent}>
                  {Curreny} {getData().tablePrice}
                </td>
              </tr>
              <tr>
                <td style={{ whiteSpace: "nowrap" }}>Other Charges</td>
                <td className="d-flex justify-content-end">
                  <input
                    className={"form-control"}
                    style={styles.input}
                    value={getData().otherCharges}
                    onChange={(e) => setOtherCharges(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>Discount</td>
                <td className="d-flex justify-content-end">
                  <input
                    className={"form-control"}
                    style={styles.input}
                    value={getData().discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </td>
              </tr>

              <tr>
                <td>Grand Total</td>
                <td style={styles.rightContent}>
                  {Curreny} {getData().grandTotal}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <OrderButton
            onClick={(type) => {
              handleOpenMdoal(type);
            }}
          />
        </div>
      </div>

      {orderConfirmOpen && (
        <OrderConfirmModal
          text={`Grand total : ${Curreny} ${getData().grandTotal}`}
          onConfirm={() => handleConfirmOrder(orderConfirmOpen)}
          onCancel={() => toggleOrderConfirmModal()}
        />
      )}
    </div>
  );
};

export default OrderTotalDisplay;
