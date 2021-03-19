import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeItemQuantity,
  removeItem,
  setActiveTable,
} from "../../../redux/action/orderActions";
import { Curreny } from "../../../redux/types";
import ItemQuantitySelector from "./ItemQuantitySelector";

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

const ActiveTableSelector = ({ tables }) => {
  const dispatch = useDispatch();
  const [active, setActive] = React.useState();

  const activeTable = useSelector((state) => state.order.activeTable);
  const lastOrderNumber = useSelector((state) => state.order.lastOrderNumber);
  const branchCode = useSelector((state) => state.user.branchCode);

  const handleItemQuantity = (quantity, itemindex) => {
    dispatch(changeItemQuantity(parseInt(quantity), itemindex));
  };
  const deleteItem = (index) => {
    dispatch(removeItem(index));
  };

  const makeTableActive = (tableNumber, index) => {
    setActive(index);
    dispatch(setActiveTable(tableNumber));
  };

  return [...tables].reverse().map((data, index) => {
    return (
      <div
        key={index}
        class="accordion"
        id="accordionExample"
        style={styles.container}
      >
        <div class="card border mb-1 shadow-none">
          <div
            class={`card-header ${active === index ? "bg-purple " : ""}`}
            style={{
              padding: "10px 10px",
            }}
            onClick={() => makeTableActive(data.tableNumber, index)}
          >
            <a
              href=""
              class="text-dark mb-0 pb-0"
              data-toggle="collapse"
              data-target={`#collapseOne${index}`}
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <div className="row " style={{ width: "100%" }}>
                <div className="col-md-12 d-flex justify-content-between">
                  <span
                    style={{ color: active === index ? "white" : undefined }}
                  >
                    Table Number:{data.tableNumber}
                  </span>

                  <span
                    style={{ color: active === index ? "white" : undefined }}
                  >
                    {data.items.length} Items
                  </span>
                  <span
                    style={{ color: active === index ? "white" : undefined }}
                  >
                    {data.associatedPerson}
                  </span>
                </div>
                <div className="col-md-12">
                  <span
                    className={
                      active === index
                        ? "badge badge-dark"
                        : "badge badge-primary"
                    }
                    style={{ color: active === index ? "white" : undefined }}
                  >
                    # {branchCode + (lastOrderNumber + index + 1)}
                  </span>
                </div>
              </div>
            </a>
          </div>
          <div
            id={`collapseOne${index}`}
            class="collapse "
            aria-labelledby="headingOne"
            data-parent="#accordionExample"
          >
            <div class=" mt-0 pt-0 pl-1 pr-1 ">
              {data.items.length > 0 ? (
                <table class="table table-sm mb-0">
                  <tbody>
                    {data.items.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.itemName}</td>
                          <td>
                            {Curreny} {item.itemPrice}
                          </td>
                          <td>
                            <ItemQuantitySelector
                              quantity={item.quantity}
                              setQuantity={(quantity) =>
                                handleItemQuantity(quantity, index)
                              }
                              deleteItem={() => deleteItem(index)}
                            />
                          </td>

                          <td className="text-right">
                            {Curreny}
                            {item.itemTotal}
                          </td>

                          <td>
                            <a href="#" onClick={() => deleteItem(index)}>
                              <i class="mdi mdi-close-circle-outline text-danger font-16"></i>
                            </a>
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
        </div>
      </div>
    );
  });
};

export default ActiveTableSelector;
