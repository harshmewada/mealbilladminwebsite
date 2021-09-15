import React from "react";
import getFloat from "../../../helpers/getFloat";
import { Card, Col, Row, Form } from "react-bootstrap";

import { useSelector } from "react-redux";
import { TYPESOFPAYMENTS } from "../../../contants";
import DeleteCommonAction from "../Actions/DeleteCommonAction";

import ModalContainer from "../ModalContainer";

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
  data,
  customerName,
  customerMobile,
}) => {
  const isLoading = useSelector((state) => state.util.spinner);
  const currency = useSelector((state) => state.user.currency);

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
      console.log("amount", amount);
      const dumbobj = {
        paymentMethodType: pay.type,
        paymentMethodId: pay.id,

        amount: getFloat(amount),
        handleAddMethod,
      };
      setPaymentMethods([...paymentMethods, dumbobj]);

      setAmount(0);
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

  let cashReturn = disabled ? getFloat(payment - totalDue) : 0;

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
      title={`Complete Order #${data?.orderNumber}`}
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
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
              </Card.Body>
              <Card.Body style={{ height: "100%" }}>
                <Row>
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
