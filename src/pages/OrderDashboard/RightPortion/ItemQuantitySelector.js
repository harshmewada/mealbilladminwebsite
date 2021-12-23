import React from "react";
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
const ItemQuantitySelector = ({
  quantity,
  setQuantity,
  deleteItem,
  isOrderConfirmed,
  isKotCompleted,
}) => {
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      deleteItem();
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    // console.log("change", value);
    if (value.length > 4) {
      alert("Maximum quantity thresold reached");
    } else if (value === "") {
      setQuantity(1);
    } else if (typeof parseInt(value) === "number") {
      setQuantity(e.target.value);
    } else {
    }
  };
  return (
    <div class="form-group mb-0 orderquantitybtns ">
      <div class="input-group" style={styles.container}>
        {!isOrderConfirmed && !isKotCompleted && (
          <span class="input-group-prepend ">
            <button
              style={styles.button}
              type="button"
              class="btn btn-outline-light shadow-none"
              onClick={decrementQuantity}
              disabled={isOrderConfirmed}
            >
              <i class="mdi mdi-minus "></i>
            </button>
          </span>
        )}
        <input
          style={styles.input}
          type="text"
          id="example-input3-group2"
          name="example-input3-group2"
          class="form-control"
          value={quantity}
          disabled={isOrderConfirmed || isKotCompleted}
          onChange={(e) => {
            handleChange(e);
          }}
        />
        {!isOrderConfirmed && !isKotCompleted && (
          <span class="input-group-append">
            <button
              style={styles.button}
              type="button"
              class="btn btn-outline-light shadow-none"
              onClick={incrementQuantity}
              disabled={isOrderConfirmed}
            >
              <i class="mdi mdi-plus"></i>
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default ItemQuantitySelector;
