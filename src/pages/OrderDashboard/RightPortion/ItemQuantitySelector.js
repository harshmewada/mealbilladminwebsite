import React from "react";
const styles = {
  container: {
    // height: "30px",
  },
  input: {
    width: "10px",
    height: "auto",
    padding: "0 10px",

    // height: "30px",
  },
  button: {
    height: "100%",
    padding: "0 10px",
  },
};
const ItemQuantitySelector = ({ quantity, setQuantity, deleteItem }) => {
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
  return (
    <div class="form-group mb-0 ">
      <div class="input-group" style={styles.container}>
        <span class="input-group-prepend ">
          <button
            style={styles.button}
            type="button"
            class="btn btn-outline-light shadow-none"
            onClick={decrementQuantity}
          >
            <i class="mdi mdi-minus "></i>
          </button>
        </span>
        <input
          style={styles.input}
          type="text"
          id="example-input3-group2"
          name="example-input3-group2"
          class="form-control"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <span class="input-group-append">
          <button
            style={styles.button}
            type="button"
            class="btn btn-outline-light shadow-none"
            onClick={incrementQuantity}
          >
            <i class="mdi mdi-plus"></i>
          </button>
        </span>
      </div>
    </div>
  );
};

export default ItemQuantitySelector;
