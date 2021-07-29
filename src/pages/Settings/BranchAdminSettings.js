import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReceiptMessage,
  updateReceiptMessage,
} from "../../redux/action/branchActions";
import { toggleKOT, togglePrinting } from "../../redux/action/utilActions";

const BranchAdminSettings = () => {
  const dispatch = useDispatch();
  const [receiptMessage, setReceiptMessage] = React.useState("");
  const [loading, setLoading] = React.useState();

  const {
    role,
    restaurantId,
    branchId,
    receiptMessage: customMessage,
    token,
  } = useSelector((state) => state.user);

  const { enablePrinting, enableKOT } = useSelector((state) => state.util);

  const handleChange = (e) => {
    setReceiptMessage(e.target.value);
  };

  const clearLoading = () => setLoading();
  const updateMessage = (e) => {
    setLoading("update");
    dispatch(
      updateReceiptMessage({
        message: receiptMessage,
        resId: restaurantId,
        branchId: branchId,
        cb: () => clearLoading(),
        errorCb: () => clearLoading(),
      })
    );
  };

  const deleteMessage = (e) => {
    dispatch(
      deleteReceiptMessage({
        message: receiptMessage,
        resId: restaurantId,
        branchId: branchId,
        cb: () => clearLoading(),
        errorCb: () => clearLoading(),
      })
    );
  };

  React.useEffect(() => {
    if (customMessage || customMessage !== null) {
      setReceiptMessage(customMessage);
    } else if (customMessage === null) {
      setReceiptMessage("");
    }
  }, [customMessage]);

  const handleOfflineMode = async () => {
    // window.api.sendData("toMain", "some data");
    // window.api.fecthOfflineData({ token: token }).then((res) => {
    //   console.log("fetchResponse", res);
    //   alert("hehe");
    // });
    const response = await window.api.fecthOfflineData({ token: token });
    console.log("response", response);

    // window.api.notify("hehe", () => {
    //   console.log("i am callback");
    // });
    // alert("hehe");
  };

  return (
    <div class="page-content-tab">
      <Card>
        <Card.Header class="card-header bg-primary">
          <h5 class="text-white">Printer Setting</h5>
        </Card.Header>
        <Card.Body>
          <div class="custom-control custom-switch switch-primary">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitchPrimary"
              checked={enablePrinting}
              onChange={(e) => {
                const checked = e.target.checked;
                dispatch(togglePrinting(checked));
              }}
            />
            <label class="custom-control-label" for="customSwitchPrimary">
              Enable Printing
            </label>
          </div>
          <div class="custom-control custom-switch switch-primary">
            <input
              type="checkbox"
              class="custom-control-input"
              id="customSwitchPrimary1"
              checked={enableKOT}
              onChange={(e) => {
                const checked = e.target.checked;
                dispatch(toggleKOT(checked));
              }}
            />
            <label class="custom-control-label" for="customSwitchPrimary1">
              Enable KOT
            </label>
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header class="card-header bg-primary">
          <h5 class="text-white">Receipt message</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <textarea
                type="text"
                placeholder="Enter message to add below receipt"
                class="form-control"
                rows={"4"}
                value={receiptMessage}
                onChange={(e) => {
                  // const checked = e.target.checked;
                  // dispatch(togglePrinting(checked));
                  handleChange(e);
                }}
              />
            </Col>
            <Col md={2}>
              <Button variant="primary" block onClick={() => updateMessage()}>
                {loading === "update" && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Update
              </Button>
            </Col>
            <Col md={2}>
              <Button
                variant="primary"
                block
                style={{ backgroundColor: "rgb(240, 88, 60)", border: "none" }}
                onClick={() => deleteMessage()}
              >
                {loading === "delete" && (
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                Delete
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header class="card-header bg-primary">
          <h5 class="text-white">Offline Mode</h5>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={2}>
              <Button
                style={{ backgroundColor: "rgb(240, 88, 60)", border: "none" }}
                block
                onClick={() => handleOfflineMode()}
              >
                Go to offline mode
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default BranchAdminSettings;
