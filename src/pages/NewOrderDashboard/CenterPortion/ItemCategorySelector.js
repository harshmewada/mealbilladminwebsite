import React from "react";
import { useSelector } from "react-redux";
import { RootUrl } from "../../../redux/types";

const styles = {
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    height: "50px",
    width: "50px",
    objectFit: "contain",
  },
  categoryName: {},
};

const ItemCategorySelector = ({ selected, setSelected }) => {
  const itemCategories = useSelector((state) => state.order.itemCategories);
  const handleSelectType = (e) => {
    setSelected(e.target.value);
  };
  return (
    <div class="form-group col-md-6">
      <select
        onChange={(e) => handleSelectType(e)}
        name="theme"
        value={selected}
        class="form-control"
        required
      >
        <option value="all">All items</option>

        {itemCategories.map((cat, index) => {
          return (
            <option key={index} value={cat.categoryName}>
              {cat.categoryName}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default ItemCategorySelector;
