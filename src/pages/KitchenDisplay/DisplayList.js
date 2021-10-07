import React from "react";
import ItemQuantitySelector from "../OrderDashboard/RightPortion/ItemQuantitySelector";
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
const DisplayList = ({
  tableNumber,
  orderType,
  orderTypeId,
  orderItems,
  branchOrderNumber,
  onItemClick,
  remarks,
  ...props
}) => {
  console.log("heheOrder", remarks, props);
  const bgColor = getColor(orderTypeId);
  return (
    <div class="card border mb-1 shadow-none mb-4">
      <div
        class={`card-header ${!bgColor ? "bg-purple" : ""} `}
        style={{
          padding: "10px 10px",
          ...getColor(orderTypeId),
        }}
        // onClick={() => makeTableActive(refId)}
      >
        <a
          href="javascript:void(0);"
          class={`text-dark mb-0 pb-0`}
          data-toggle="collapse"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          <div className="row " style={{ width: "100%" }}>
            {/* <div className="col-md-12 "> */}
            <div className="col-md-8">
              {tableNumber ? (
                <span
                  style={{
                    color: bgColor ? undefined : "white",
                  }}
                >
                  Table Number: {tableNumber}
                </span>
              ) : (
                <span
                  style={{
                    color: bgColor ? undefined : "white",
                  }}
                >
                  {orderType}
                </span>
              )}
            </div>
            <div className="col-md-4">
              <span style={{ color: bgColor ? undefined : "white" }}>
                {orderItems?.length} Items
              </span>
            </div>

            {/* </div> */}
            <div className="col-md-12">
              <span
                className={"badge badge-dark"}
                style={{ color: bgColor ? undefined : "white" }}
              >
                {branchOrderNumber}
              </span>
            </div>
            {remarks &&
              remarks.map((a) => {
                return (
                  <div className="col-md-12 mt-1">
                    <span
                      className={"badge badge-danger p-1"}
                      style={{ color: bgColor ? undefined : "white" }}
                    >
                      Remarks - {a}
                    </span>
                  </div>
                );
              })}
            {/* {remarks && (
              <div className="col-md-12 mt-1">
                <span
                  className={"badge badge-danger p-1"}
                  style={{ color: bgColor ? undefined : "white" }}
                >
                  Remarks - {remarks}
                </span>
              </div>
            )} */}
          </div>
        </a>
      </div>

      <div class=" mt-0 pt-0 pl-1 pr-1 ">
        {orderItems?.length > 0 ? (
          <table class="table table-sm mb-0 ordertable">
            <tbody>
              {orderItems.map((item, index) => {
                const { itemId } = item;
                return (
                  <tr
                    key={index}
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => onItemClick(item.itemId, item.kotId)}
                  >
                    {/* <th scope="row">{index + 1}</th> */}
                    <td>{item.itemName}</td>

                    <td>
                      <ItemQuantitySelector
                        quantity={item.quantity}
                        setQuantity={(quantity) => {}}
                        deleteItem={() => {}}
                        isOrderConfirmed={true}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p class="mb-0 text-muted p-2">No Items Selected</p>
        )}
      </div>
    </div>
  );
};

export default DisplayList;
