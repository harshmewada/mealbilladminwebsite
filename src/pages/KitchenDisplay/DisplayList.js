import React from "react";
import ItemQuantitySelector from "../OrderDashboard/RightPortion/ItemQuantitySelector";
const DisplayList = ({ tableNumber, orderType, items, branchOrderNumber }) => {
  return (
    <div class="card border mb-1 shadow-none">
      <div
        class={`card-header bg-purple `}
        style={{
          padding: "10px 10px",
          // ...getColor(orderType),
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
                    color: "white",
                  }}
                >
                  Table Number: {tableNumber}
                </span>
              ) : (
                <span
                  style={{
                    color: "white",
                  }}
                >
                  {orderType}
                </span>
              )}
            </div>
            <div className="col-md-4">
              <span style={{ color: "white" }}>{items?.length} Items</span>
            </div>

            {/* </div> */}
            <div className="col-md-12">
              <span className={"badge badge-dark"} style={{ color: "white" }}>
                {branchOrderNumber}
              </span>
            </div>
          </div>
        </a>
      </div>

      <div class=" mt-0 pt-0 pl-1 pr-1 ">
        {items?.length > 0 ? (
          <table class="table table-sm mb-0 ordertable">
            <tbody>
              {items.map((item, index) => {
                const { itemId } = item;
                return (
                  <tr key={index}>
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
