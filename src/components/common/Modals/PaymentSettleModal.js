import React from "react";
import getFloat from "../../../helpers/getFloat";
import { Card, Col, Row, Form, InputGroup, FormControl } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { TYPESOFPAYMENTS } from "../../../contants";
import DeleteCommonAction from "../Actions/DeleteCommonAction";

import ModalContainer from "../ModalContainer";
import {
  setDiscount,
  setOtherCharges,
} from "../../../redux/action/orderActions";
import calculateOrderTotals from "../../../helpers/calculateOrderTotals";
import calculateBranchOrderNumber from "../../../helpers/calculateBranchOrderNumber";
const calculatePayment = (usermethods, cartTotal) => {
  let methods = {};
  methods.payment = 0;

  usermethods.forEach((item) => {
    methods.payment += item.amount;
  });
  methods.balance = cartTotal - methods.payment;
  return methods;
};

const styles = {
  container: {
    // height: "30px",
  },
  input: {
    width: "50px",
    height: "auto",
    padding: "0 10px",

    // height: "30px",
  },
  button: {
    height: "100%",
    padding: "0 10px",
  },
};

const PaymentModal = ({
  open,
  onClose,
  onSubmit,

  customerName,
  customerMobile,
}) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.util.spinner);
  const { name, restaurantId, branchId, branchCode, cgst, sgst, currency } =
    useSelector((state) => state.user);
  const { activeOrder, activeOrders } = useSelector((state) => state.order);

  const active = activeOrders.find((od) => od.refId === activeOrder);
  let discount = active?.discount;
  let otherCharges = active?.otherCharges;

  const orderNumberCount = useSelector((state) => state.order.orderNumberCount);

  const getData = () => {
    return calculateOrderTotals(active, cgst, sgst, otherCharges, discount);
  };
  const branchOrderNumber = () =>
    calculateBranchOrderNumber(branchCode, orderNumberCount);
  const data = getData();

  const [paymentMethods, setPaymentMethods] = React.useState([]);
  const [amount, setAmount] = React.useState(data?.grandTotal);

  const [customerCount, setCustomerCount] = React.useState(1);
  const [state, setState] = React.useState({
    customerName: customerName,
    customerMobile: customerMobile,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  const incrementCustomerCount = () => {
    setCustomerCount(customerCount + 1);
  };

  const decrementCustomerCount = () => {
    if (customerCount > 1) {
      setCustomerCount(customerCount - 1);
    }
  };

  const handleCusChange = (e) => {
    const { value } = e.target;
    // console.log("change", value);
    if (value.length > 2) {
      alert("Maximum count thresold reached");
    } else if (value === "") {
      setCustomerCount(1);
    } else if (typeof parseInt(value) === "number") {
      setCustomerCount(e.target.value);
    } else {
    }
  };
  const handleClose = () => {
    setPaymentMethods([]);
    setAmount(0);
    onClose();
  };

  const handleChange = (e) => {
    const { value } = e.target;

    if (value >= 0) {
      setAmount(value);
    } else {
      setAmount(0);

      // alert("Please enter valid amount");
    }
  };

  const handleAddMethod = (pay) => {
    if (getFloat(amount) > 0) {
      let totalDue = data?.grandTotal;
      let payment = getFloat(amount);
      let cashReturn = getFloat(payment - totalDue);

      const dumbobj = {
        paymentMethodType: pay.type,
        paymentMethodId: pay.id,

        // amount: getFloat(amount),
        amount: cashReturn >= totalDue ? totalDue : getFloat(amount),
      };

      let mainObject = {
        ...dumbobj,
      };
      if (paymentMethods.length > 0) {
        let dummybalance = getFloat(
          calculatePayment(paymentMethods, totalDue).balance
        );

        mainObject = {
          paymentMethodType: pay.type,
          paymentMethodId: pay.id,

          amount: cashReturn >= totalDue ? dummybalance : getFloat(amount),
        };

        // let newPayment = getFloat(
        //   calculatePayment([...paymentMethods], totalDue).payment
        // );
        // cashReturn = getFloat(amount) - newPayment;
        // console.log(
        //   "settle data",
        //   totalDue,
        //   newPayment,
        //   cashReturn,
        //   getFloat(amount)
        // );
      }
      // setCashReturn(cashReturn > 0 ? cashReturn : 0);
      setPaymentMethods([...paymentMethods, mainObject]);

      // setAmount(0);
    } else {
      alert("Please enter valid amount");
    }
  };

  const handleDelete = ({ index }) => {
    setPaymentMethods(paymentMethods.filter((id, i) => i !== index));
  };

  const handleReceived = () => {
    onSubmit(
      {
        paymentMethods,
        totalPayment: payment,
        totalBalance: balance,
        totalCashReturn: cashReturn,
        discount,
        otherCharges,
      },
      state
    );
  };

  let totalDue = data?.grandTotal;

  let payment = getFloat(calculatePayment(paymentMethods, totalDue).payment);

  let dummybalance = getFloat(
    calculatePayment(paymentMethods, totalDue).balance
  );
  let disabled = dummybalance <= 0;
  let balance = disabled ? 0 : dummybalance;

  // let cashReturn = disabled ? getFloat(payment - totalDue) : 0;
  const [cashReturn, setCashReturn] = React.useState(0);

  let grandTotalWithoutDiscount = data?.grandTotalWithoutDiscount;
  let grandTotal = data?.grandTotal;

  React.useEffect(() => {
    setAmount(balance);
  }, [balance]);

  React.useEffect(() => {
    let totalPaid = payment;
    const currAmount = getFloat(amount);
    const newPaymentMethods = paymentMethods.filter(
      (a, i) => i !== paymentMethods.length - 1
    );
    // let lastpayment = getFloat(
    //   calculatePayment(newPaymentMethods, totalDue).payment
    // );

    // delete newPaymentMethods[newPaymentMethods.length - 1];
    let lastPayments = getFloat(
      calculatePayment(newPaymentMethods, totalDue).payment
    );

    // console.log("settle data", payment, lastPayments);
    if (currAmount > totalPaid) {
      setCashReturn(currAmount + lastPayments - totalPaid);
    } else {
      let toReturn = totalPaid - currAmount;
      // console.log("settle data", payment, lastPayments, toReturn, lastpayment);

      setCashReturn(toReturn > 0 ? toReturn : 0);
    }

    // if (paymentMethods.length === 0) {
    //   setCashReturn(0);
    // }
    // if (paymentMethods.length > 0) {
    //   let returnMoney = 0;
    //   console.log("settle data", totalDue, payment, payment - totalDue);

    //   if (getFloat(amount) > totalDue) {
    //     console.log("settle data if");

    //     setCashReturn(0);
    //   } else {
    //     console.log("settle data else");

    //     setCashReturn(getFloat(amount) - totalDue);
    //   }
    // }
  }, [paymentMethods]);

  // React.useEffect(() => {
  //   if (paymentMethods.length > 0) {
  //     console.log("settle data", totalDue, payment, payment - totalDue);

  //     if (getFloat(amount) > totalDue) {
  //       setCashReturn(
  //         getFloat(amount) - totalDue > 0 ? getFloat(amount) - totalDue : 0
  //       );
  //     } else {
  //       let returnMoney = getFloat(amount) + payment - totalDue;
  //       console.log(
  //         "settle data else",
  //         getFloat(amount) + payment - totalDue,
  //         returnMoney
  //       );

  //       setCashReturn(returnMoney > 0 ? returnMoney : 0);
  //     }
  //   } else {
  //     setCashReturn(0);
  //   }
  // }, [paymentMethods]);
  const renderUpTableRow = (title, value, isCurrency) => {
    return (
      <tr>
        <td>{title}</td>
        <td>
          {!isCurrency && currency}
          {value}
        </td>
      </tr>
    );
  };

  const renderImageButton = (pay) => {
    return (
      <Card
        className="text-center bg-white text-white border shadow-none"
        onClick={() => handleAddMethod(pay)}
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: "pointer",
        }}
      >
        <Card.Body>
          <i
            class={pay.icon}
            style={{
              height: "10vh",
              width: "100%",
              fontSize: "45px",
              color: "#f0583c",
            }}
          />
        </Card.Body>
        <Card.Footer className="text-center bg-light text-dark">
          {pay.type}
        </Card.Footer>
      </Card>
    );
  };

  const renderTotalTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered table-sm">
          <tbody>
            {renderUpTableRow("Total Due", totalDue)}
            {renderUpTableRow("Payment", payment)}
            {renderUpTableRow("Balance", balance)}
            {renderUpTableRow("Cash Return", cashReturn, "")}
          </tbody>
        </table>
      </div>
    );
  };

  const renderCustomerCount = () => {
    const cuntValue = totalDue / customerCount;
    return (
      <div className="d-flex align-items-center mb-3">
        <div class="form-group mb-0 orderquantitybtns flex-1">
          <div class="input-group" style={styles.container}>
            <span class="input-group-prepend ">
              <button
                style={styles.button}
                type="button"
                class="btn btn-outline-light shadow-none"
                onClick={decrementCustomerCount}
                disabled={customerCount === 1}
              >
                <i class="mdi mdi-minus text-danger"></i>
              </button>
            </span>
            <input
              style={styles.input}
              type="text"
              id="example-input3-group2"
              name="example-input3-group2"
              class="form-control"
              value={customerCount}
              onChange={(e) => {
                handleCusChange(e);
              }}
            />

            <span class="input-group-append">
              <button
                style={styles.button}
                type="button"
                class="btn btn-outline-light shadow-none"
                onClick={incrementCustomerCount}
              >
                <i class="mdi mdi-plus"></i>
              </button>
            </span>
          </div>
        </div>
        <div className="flex-1 ml-3">Customer / Per Customer</div>
        <div className="flex-1 ml-1">
          {getFloat(cuntValue, 2)} {currency}
        </div>
      </div>
    );
  };

  const renderPaymentTable = () => {
    return (
      <div className="table-responsive">
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th width="30%">Payment Method</th>

              <th width="50%">Amount</th>
              <th width="20%">Action</th>
            </tr>
          </thead>
          <tbody>
            {paymentMethods.map((method, index) => {
              return (
                <tr key={index}>
                  <td>{method.paymentMethodType.toUpperCase()}</td>
                  <td>{method.amount}</td>
                  <td>
                    <DeleteCommonAction
                      onClick={() => handleDelete({ index })}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const ReceiveCard = () => {
    return (
      <div>
        <Card>
          {/* <Card.Header>
            <button className="btn btn-info btn-lg btn-block">Received</button>
          </Card.Header> */}
          <Card.Body>
            {renderTotalTable()}
            {renderCustomerCount()}

            {renderPaymentTable()}
          </Card.Body>
        </Card>
      </div>
    );
  };
  return (
    <ModalContainer
      open={open}
      onClose={() => {
        handleClose();
      }}
      title={`Complete Order #${branchOrderNumber()}`}
    >
      <Row>
        <Col md={6}>
          <Card>
            {/* <Card.Header>
        <button className="btn btn-info btn-lg btn-block">Received</button>
      </Card.Header> */}
            <Card.Body>
              <input
                type="text"
                name="customerName"
                onChange={(e) => handleInputChange(e)}
                className="form-control "
                style={{
                  borderColor: "gray",
                }}
                placeholder="Customer Name"
                value={state.customerName}
              />
              <input
                name="customerMobile"
                type="number"
                max="10"
                maxLength="10"
                onChange={(e) => handleInputChange(e)}
                className="form-control mt-3 "
                style={{
                  borderColor: "gray",
                }}
                value={state.customerMobile}
                placeholder="Customer Mobile Number"
              />
            </Card.Body>
          </Card>

          <ReceiveCard />
        </Col>
        <Col md={6}>
          <div>
            <Card>
              <Card.Header className="text-white">Amount</Card.Header>
              <Card.Body>
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter Amount"
                  onChange={(e) => handleChange(e)}
                  value={amount}
                  disabled={disabled}
                  step="0.01"
                />
                <div className="d-flex mt-3">
                  <div className="d-flex bg-light mr-2">
                    <Form.Label
                      column
                      style={{ textAlign: "left", whiteSpace: "nowrap" }}
                    >
                      O. Charges
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="O.Charges"
                      value={otherCharges}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          dispatch(setOtherCharges(parseFloat(0)));
                          return;
                        }
                        if (parseFloat(e.target.value) >= 0) {
                          dispatch(setOtherCharges(e.target.value));
                        } else {
                          dispatch(setOtherCharges(0));
                        }
                      }}
                    />
                  </div>
                  <div className="d-flex bg-light ml-2">
                    <Form.Label
                      column
                      style={{ textAlign: "left", whiteSpace: "nowrap" }}
                    >
                      Discount
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="O.Charges"
                      value={discount}
                      onChange={(e) => {
                        if (e.target.value === "") {
                          dispatch(setDiscount(parseFloat(0)));
                          return;
                        }
                        if (
                          parseFloat(e.target.value) >=
                          parseFloat(grandTotalWithoutDiscount)
                        ) {
                          alert("Maximum Discount Reached");

                          dispatch(
                            setDiscount(
                              parseFloat(discount) + parseFloat(grandTotal)
                            )
                          );
                          return;
                        } else {
                          console.log("discount else");

                          dispatch(setDiscount(e.target.value));
                        }
                      }}
                    />
                  </div>
                </div>
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}

                <Row className="mt-3">
                  {TYPESOFPAYMENTS.map((pay) => {
                    return <Col>{renderImageButton(pay)}</Col>;
                  })}
                  {/* <Col>{renderImageButton("icons/cash-icon.png", "cash")}</Col>
                  <Col>{renderImageButton("icons/creditcard.png", "card")}</Col> */}
                </Row>
              </Card.Body>
              <Card.Footer>
                <div class="form-group mb-0">
                  <button
                    onClick={() => handleReceived()}
                    disabled={!disabled}
                    class="btn btn-gradient-primary waves-effect waves-light"
                  >
                    {isLoading && (
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                    )}
                    Received
                  </button>
                  <button
                    type="reset"
                    class="btn btn-gradient-danger waves-effect ml-3"
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </Col>
      </Row>
    </ModalContainer>
  );
};

export default PaymentModal;
